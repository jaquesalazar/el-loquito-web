/* Servicios simulados para consultar los Shorts del perfil y del reproductor. */

import { profileData } from '../profile/data'
import { shortsData } from './data'

export async function getShorts() {
  return Promise.resolve([...profileData.shorts])
}

export async function getPlayerShorts() {
  return Promise.resolve([...shortsData])
}
