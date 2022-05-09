import { MyHeader } from '#C/header/Header'
import { useRequest, useSessionStorageState } from 'ahooks'
import { Radio } from 'antd'
import { findAll } from './service'
import ViewGroups from './view'

export function Groups() {
  const [value, setValue] = useSessionStorageState('groups-value', { defaultValue: '1' })
  const { data: groups, ...state } = useRequest(() => findAll(value), {
    refreshDeps: [value],
    refreshOnWindowFocus: true,
  })
  console.log(`render: Groups, groups=${groups !== undefined}`)
  return (
    <div className="Groups">
      <MyHeader
        title="推荐列表"
        state={state}
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
