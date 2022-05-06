import { fetchResult } from '#H/UseResult'

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
  if (search.search) params.append('search', search.search)
  if (search.types) params.append('types', search.types.join(','))
  if (search.page) params.append('page', `${search.page}`)
  if (search.size) params.append('size', `${search.size}`)
  return fetchResult<Message[]>(`/api/messages/${name}?${params}`)
}
