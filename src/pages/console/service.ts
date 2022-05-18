import { MyOptions } from '#A/types'
import { fetchResult } from '#H/use-result'

export const nameOptions: MyOptions = [
  { value: 'SPIDER_CONTENT', label: '排名抓取' },
  { value: 'SPIDER_HISTORY', label: '上架抓取' },
  { value: 'SERVER_DISC', label: '碟片日志' },
  { value: 'SERVER_USER', label: '用户日志' },
  { value: 'SERVER_CORE', label: '核心日志' },
  { value: 'DEFAULT', label: '其他日志' },
] as const

export const typeOptions: MyOptions = [
  { value: 'DEBUG', label: '调试' },
  { value: 'INFO', label: '信息' },
  { value: 'NOTIFY', label: '通知' },
  { value: 'SUCCESS', label: '成功' },
  { value: 'WARNING', label: '警告' },
  { value: 'ERROR', label: '错误' },
] as const

const nameValues = nameOptions.map((e) => e.value)

const typeValues = typeOptions.map((e) => e.value)

export type Name = typeof nameValues[number]

export type Type = typeof typeValues[number]

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
