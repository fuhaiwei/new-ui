import dayjs from 'dayjs'
import { IUser } from './service'

export function renderId(row: IUser) {
  return row.id
}

export function renderName(row: IUser) {
  return row.username
}

export function renderRoles(row: IUser) {
  return row.roles.join(',')
}

export function renderEnabled(row: IUser) {
  return row.enabled ? 'Enabled' : 'Disabled'
}

export function renderCreateOn(row: IUser) {
  return dayjs(row.registerDate).format('YY-MM-DD HH:mm:ss')
}

export function renderAccessOn(row: IUser) {
  if (row.lastLoggedIn === undefined) return '---'
  return dayjs(row.lastLoggedIn).format('YY-MM-DD HH:mm:ss')
}
