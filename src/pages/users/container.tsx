import { MyHeader } from '#C/header/Header'
import { MyPagination } from '#C/pagination/Pagination'
import { useOnceRequest } from '#H/use-once'
import useUrlState from '@ahooksjs/use-url-state'
import { useWhyDidYouUpdate } from 'ahooks'
import { Table } from 'antd'
import Column from 'antd/lib/table/Column'
import * as renders from './renders'
import { findAll, Search } from './service'

export function Users() {
  const [search, setSearch] = useUrlState<Search>()
  const { data, ...state } = useOnceRequest(() => findAll(search), {
    refreshDeps: [search],
  })
  const { data: users, page } = data ?? {}
  useWhyDidYouUpdate('Users', { ...search, ...state, users, page })
  return (
    <div className="Users">
      <MyHeader state={state} title="Users" />
      <Table dataSource={users} rowKey="id">
        <Column title="ID" render={renders.renderId} />
        <Column title="Name" render={renders.renderName} />
        <Column title="Roles" render={renders.renderRoles} />
        <Column title="Enabled" render={renders.renderEnabled} />
        <Column title="CreateOn" render={renders.renderCreateOn} />
        <Column title="AccessOn" render={renders.renderAccessOn} />
      </Table>
      <MyPagination page={page} onChange={(page, size) => setSearch({ page, size })} />
    </div>
  )
}
