import { fetchResult } from '#H/UseResult'

export interface IGroup {
  id: number
  key: string
  title: string
  enabled: boolean
  viewType: string
  discCount: number
  modifyTime?: number
}

export function findAll(value: string) {
  let hasDisable = false
  let hasPrivate = false
  if (value !== '1') hasDisable = true
  if (value === '3') hasPrivate = true
  return fetchResult<IGroup[]>(`/api/discGroups?hasDisable=${hasDisable}&hasPrivate=${hasPrivate}`)
}
