import { fetchResult } from '#H/use-result'

export interface IUser {
  id: number
  username: string
  enabled: boolean
  roles: string[]
  lastLoggedIn: number
  registerDate?: number
}

export interface Search {
  page: number
  size: number
}

export function findAll({ page = 1, size = 20 }: Partial<Search>) {
  return fetchResult<IUser[]>(`/api/users?page=${page}&size=${size}`)
}
