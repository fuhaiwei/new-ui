import { MyHeader } from '#C/header/Header'
import { useRequest, useSessionStorageState } from 'ahooks'
import { Radio } from 'antd'
import { findAll } from './service'
import ViewGroups from './view'

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
