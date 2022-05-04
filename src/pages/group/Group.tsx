import { useResult } from '#A/hooks'
import ViewGroups from './GroupList'

export interface IGroup {
  id: number
  key: string
  title: string
  enabled: boolean
  viewType: string
  discCount: number
  modifyTime: number
}

export function findAll() {
  return fetch('/api/discGroups')
}

export default function Groups() {
  const [groups, refresh] = useResult<IGroup[]>(findAll)
  console.log(`render: Groups`)
  return <ViewGroups groups={groups} refresh={refresh} />
}
