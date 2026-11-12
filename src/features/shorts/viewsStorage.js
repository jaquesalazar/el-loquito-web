// Almacenamiento local de vistas pendientes de sincronización en CatTube.

const DATABASE_NAME = 'cattube-offline'
const DATABASE_VERSION = 2
const STORE_NAME = 'views'

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
    action(transaction.objectStore(STORE_NAME))

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

export async function addPendingView(userId, videoId) {
  const id = `view-${userId}-${videoId}-${Date.now()}-${Math.random()}`

  await executeTransaction('readwrite', store => {
    store.put({ id, userId, videoId, createdAt: Date.now() })
  })
}

export async function getPendingViews(userId) {
  const database = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, 'readonly')
    const request = transaction.objectStore(STORE_NAME).getAll()

    request.onsuccess = () => {
      resolve(request.result.filter(view => view.userId === userId))
    }

    request.onerror = () => reject(request.error)
    transaction.oncomplete = () => database.close()
  })
}

export async function removePendingView(id) {
  return executeTransaction('readwrite', store => {
    store.delete(id)
  })
}
