import { fetchResult } from '#H/use-result'

export interface IGroup {
  id: number
  key: string
  title: string
  enabled: boolean
  viewType: string
  discCount: number
  modifyTime?: number
}

export function findAll(viewType: string) {
  let hasDisable = false
  let hasPrivate = false
  if (viewType !== '1') hasDisable = true
  if (viewType === '3') hasPrivate = true
  return fetchResult<IGroup[]>(
    `/api/discGroups?hasDisable=${hasDisable}&hasPrivate=${hasPrivate}`
  ).then((result) => result.data)
}
