import { useResult } from '#A/hooks'
import { Column, Table } from '#B/@table/Table'
import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, PageHeader } from 'antd'
import { Link } from 'react-router-dom'

export interface IGroup {
  id: number
  key: string
  title: string
  enabled: boolean
  viewType: string
  discCount: number
  modifyTime: number
}

const cols: Column<IGroup>[] = [
  {
    key: 'idx',
    title: '#',
    format: (_, idx) => idx + 1,
  },
  {
    key: 'title',
    title: '列表标题',
    format: formatLinkedTitle,
  },
  {
    key: 'update',
    title: '最后更新',
    format: formatLastUpdate,
  },
  {
    key: 'edit',
    title: '编辑列表',
    format: formatEdit,
  },
  {
    key: 'item',
    title: '增减碟片',
    format: formatItem,
  },
]

function findAll() {
  return fetch('/api/discGroups')
}

export default function Groups() {
  const [groups, refresh] = useResult<IGroup[]>(findAll)
  const extra = <Button onClick={refresh}>刷新</Button>
  console.log(`render: Groups, groups: ${groups !== undefined}`)
  return (
    <div className="GroupList">
      <PageHeader title="推荐列表" extra={extra} onBack={() => window.history.back()} />
      {groups && <Table rows={groups} cols={cols} />}
    </div>
  )
}

function formatLinkedTitle(row: IGroup) {
  let color = isJustUpdated(row.modifyTime) ? 'red' : '#C67532'
  return (
    <>
      <Link to={`/discs/disc_groups/${row.key}`}>{row.title}</Link>
      <span style={{ color, marginLeft: 8 }}>({row.discCount})</span>
    </>
  )
}

function isJustUpdated(time?: number) {
  return time && Date.now() - time < 3600000 // 1.0 hour
}

function formatLastUpdate(row: IGroup) {
  if (!row.enabled || !row.modifyTime) return '停止更新'
  return `${formatTimeout(row.modifyTime)}前`
}

const times: [number, string][] = [[1000, '秒']]
times.unshift([times[0][0] * 60, '分'])
times.unshift([times[0][0] * 60, '时'])
times.unshift([times[0][0] * 24, '日'])

function formatTimeout(time: number) {
  let timeout = Date.now() - time
  if (timeout < 0) return formatTime(time)

  const result: string[] = []
  for (const [milis, name] of times) {
    const num = Math.floor(timeout / milis)
    if (num > 0 || result.length) {
      result.push(`${num}${name}`)
      if (result.length >= 2) break
    }
    timeout %= milis
  }
  return result.join('')
}

export function formatTime(time: number) {
  return new Date(time).toLocaleString()
}

function formatEdit(group: IGroup) {
  return (
    <Link to={`/disc_groups/${group.key}`}>
      <EditOutlined />
    </Link>
  )
}

function formatItem(group: IGroup) {
  return (
    <Link to={`/disc_groups/${group.key}/discs`}>
      <UnorderedListOutlined />
    </Link>
  )
}
