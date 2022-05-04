import { MyHeader } from '#C/header/Header'
import { fetchResult } from '#H/UseResult'
import { useRequest, useSessionStorageState } from 'ahooks'
import { Alert, Radio } from 'antd'
import ViewGroups from './Groups'

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

export function Groups() {
  const [value, setValue] = useSessionStorageState('groups-value', { defaultValue: '1' })
  const { loading, error, data, refresh } = useRequest(() => findAll(value), {
    refreshDeps: [value],
    refreshOnWindowFocus: true,
  })
  const groups = data?.data
  console.log(`render: Groups, loading: ${loading}`)
  return (
    <div className="Groups">
      <MyHeader
        title="推荐列表"
        error={error}
        loading={loading}
        refresh={refresh}
        extra={
          <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
            <Radio value="1">仅推荐</Radio>
            <Radio value="2">含备份</Radio>
            <Radio value="3">全部</Radio>
          </Radio.Group>
        }
      />
      <ViewGroups groups={groups} />
    </div>
  )
}
