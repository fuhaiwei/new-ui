import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from 'react-router-dom'
import { IGroup } from './service'

interface Props {
  groups?: IGroup[]
}

export default React.memo(ViewGroups)

function ViewGroups(props: Props) {
  const { groups } = props
  console.log(`render: ViewGroups, groups: ${groups !== undefined}`)
  return (
    <div className="ViewGroups">
      <Table dataSource={groups}>
        <Column key="title" title="列表标题" render={renderTitle} />
        <Column key="updateOn" title="更新时间" render={renderUpdateOn} />
      </Table>
    </div>
  )
}

function renderTitle(row: IGroup) {
  const style = { color: getJustColor(row.modifyTime), marginLeft: 8 }
  return (
    <>
      <Link to={`/discs/disc_groups/${row.key}`}>{row.title}</Link>
      <span style={style}>({row.discCount})</span>
    </>
  )
}

function getJustColor(time?: number) {
  return time && Date.now() - time < 3600_000 ? '#FF0000' : '#C67532'
}

function renderUpdateOn(row: IGroup) {
  if (row.enabled === false) {
    return '停止更新'
  }
  if (row.modifyTime === undefined) {
    return '从未更新'
  }
  return dayjs(row.modifyTime).fromNow()
}
