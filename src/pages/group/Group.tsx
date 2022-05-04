import { fetchResult } from '#H/UseResult'
import { useRequest, useSessionStorageState } from 'ahooks'
import { Alert, Button, PageHeader, Radio } from 'antd'
import { useCallback } from 'react'
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
      <PageHeader
        title="推荐列表"
        extra={
          <>
            <Button loading={loading} onClick={refresh}>
              刷新
            </Button>
            <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
              <Radio value="1">仅推荐</Radio>
              <Radio value="2">含备份</Radio>
              <Radio value="3">全部</Radio>
            </Radio.Group>
          </>
        }
        onBack={() => window.history.back()}
      />
      {error && <Alert message={`${error.name}:${error.message}`} />}
      <ViewGroups groups={groups} />
    </div>
  )
}
