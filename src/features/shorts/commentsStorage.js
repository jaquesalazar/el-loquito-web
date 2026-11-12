// Almacenamiento local de comentarios de CatTube mediante IndexedDB.

const DATABASE_NAME = 'cattube-offline'
const DATABASE_VERSION = 2
const STORE_NAME = 'comments'

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function executeTransaction(mode, action) {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode)
    const store = transaction.objectStore(STORE_NAME)

    action(store)

    transaction.oncomplete = () => {
      database.close()
      resolve()
    }

    transaction.onerror = () => {
      database.close()
      reject(transaction.error)
    }

    transaction.onabort = () => {
      database.close()
      reject(transaction.error)
    }
  })
}

function getLocalId(videoId, userId, commentId) {
  return `server-${userId}-${videoId}-${commentId}`
}

export async function getStoredComments(videoId, userId) {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly')
    const request = transaction.objectStore(STORE_NAME).getAll()

    request.onsuccess = () => {
      resolve(request.result.filter(
        (comment) =>
          comment.videoId === videoId &&
          comment.userId === userId &&
          !comment.pendingDelete
      ))
    }

    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
  })
}

export async function saveStoredComments(videoId, userId, comments) {
  return executeTransaction('readwrite', (store) => {
    for (const comment of comments) {
      const id = getLocalId(videoId, userId, comment.idComentario)

      const request = store.get(id)

      request.onsuccess = () => {
        const previous = request.result

        store.put({
          ...comment,
          id,
          videoId,
          userId,
          pendingDelete: previous?.pendingDelete || false,
          pendingCreate: false
        })
      }
    }
  })
}

export async function addPendingComment(videoId, userId, comment) {
  const id = `pending-${userId}-${videoId}-${Date.now()}-${Math.random()}`

  await executeTransaction('readwrite', (store) => {
    store.put({
      ...comment,
      id,
      videoId,
      userId,
      pendingCreate: true,
      pendingDelete: false
    })
  })

  return id
}

export async function markCommentForDeletion(commentId, videoId, userId) {
  return executeTransaction('readwrite', (store) => {
    const id = getLocalId(videoId, userId, commentId)
    const request = store.get(id)

    request.onsuccess = () => {
      if (request.result) {
        store.put({ ...request.result, pendingDelete: true })
      }
    }
  })
}

export async function removeStoredComment(commentId, videoId, userId) {
  return executeTransaction('readwrite', (store) => {
    store.delete(getLocalId(videoId, userId, commentId))
  })
}

export async function removePendingComment(localId) {
  return executeTransaction('readwrite', (store) => {
    store.delete(localId)
  })
}

export async function getPendingComments(videoId, userId) {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly')
    const request = transaction.objectStore(STORE_NAME).getAll()

    request.onsuccess = () => {
      resolve(request.result.filter(
        (comment) =>
          comment.videoId === videoId &&
          comment.userId === userId &&
          (comment.pendingCreate || comment.pendingDelete)
      ))
    }

    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
  })
}
