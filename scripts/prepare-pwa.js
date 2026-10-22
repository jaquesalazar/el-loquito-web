
/* Prepara la caché de producción de CatTube con los archivos generados por Vite. */

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'
import process from 'node:process'
import { createHash } from 'node:crypto'

const distDirectory = 'dist'
const serviceWorkerPath = join(distDirectory, 'service-worker.js')

async function getFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...await getFiles(fullPath))
    } else if (entry.isFile()) {
      files.push(fullPath)
    }
  }

  return files
}

async function preparePWA() {
  const files = await getFiles(distDirectory)

  const resources = files
    .map((file) => relative(distDirectory, file).split(sep).join('/'))
    .filter((path) => {
      if (path.endsWith('.gitkeep')) {
        return false
      }

      return (
        path === 'index.html' ||
        path === 'offline.html' ||
        path === 'manifest.webmanifest' ||
        path.startsWith('assets/') ||
        path.startsWith('icons/')
      )
    })
    .map((path) => `/${path}`)
    .sort()

  const appShell = ['/', ...resources]
  const serviceWorker = await readFile(serviceWorkerPath, 'utf8')

  const version = createHash('sha256')
    .update(JSON.stringify(appShell))
    .update(serviceWorker)
    .digest('hex')
    .slice(0, 12)

  const updatedServiceWorker = serviceWorker
    .replace(
      /const CACHE_NAME = 'cattube-static-v1'/,
      `const CACHE_NAME = 'cattube-static-${version}'`
    )
    .replace(
      /const APP_SHELL = \[[\s\S]*?\]/,
      `const APP_SHELL = ${JSON.stringify(appShell, null, 2)}`
    )

  if (
    updatedServiceWorker === serviceWorker ||
    updatedServiceWorker.includes("const CACHE_NAME = 'cattube-static-v1'")
  ) {
    throw new Error('No se pudo actualizar el Service Worker.')
  }

  await writeFile(serviceWorkerPath, updatedServiceWorker)

  console.log(`PWA preparada: ${appShell.length} recursos incluidos.`)
  console.log(`Versión de caché: cattube-static-${version}`)
}

preparePWA().catch((error) => {
  console.error('Error al preparar la PWA:', error)
  process.exitCode = 1
})
