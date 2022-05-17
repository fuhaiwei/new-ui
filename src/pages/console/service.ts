import { fetchResult } from '#H/use-result'

export const allNames = [
  'SPIDER_CONTENT',
  'SPIDER_HISTORY',
  'SERVER_DISC',
  'SERVER_USER',
  'SERVER_CORE',
  'DEFAULT',
] as const

export const allTypes = ['DEBUG', 'INFO', 'NOTIFY', 'SUCCESS', 'WARNING', 'ERROR'] as const

export type Name = typeof allNames[number]

export type Type = typeof allTypes[number]

export interface Message {
  id: number
  name: Name
  type: Type
  text: string
  createOn: number
  acceptOn: number
}

export interface Search {
  search?: string
  types?: Type[]
  page?: number
  size?: number
}

export function findAll(name: Name, search: Partial<Search>) {
  const params = new URLSearchParams()
  if (isNotEmpty(search.search)) params.append('search', search.search)
  if (isNotEmpty(search.types)) params.append('types', search.types.join(','))
  if (isNotEmpty(search.page)) params.append('page', `${search.page}`)
  if (isNotEmpty(search.size)) params.append('size', `${search.size}`)
  return fetchResult<Message[]>(`/api/messages/${name}?${params}`)
}

function isNotEmpty<T>(target?: T & { length?: number }): target is T {
  return target !== undefined && (target.length ?? 0) > 0
}
