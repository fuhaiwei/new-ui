import { MyHeader } from '#C/header/Header'
import { useOnceRequest } from '#H/use-once'
import { useSessionStorageState, useWhyDidYouUpdate } from 'ahooks'
import { Radio } from 'antd'
import { findAll } from './service'
import ViewGroups from './view'

export function Groups() {
  const [value, setValue] = useSessionStorageState('groups-value', { defaultValue: '1' })
  const { data: groups, ...state } = useOnceRequest(() => findAll(value), {
    refreshDeps: [value],
  })
  useWhyDidYouUpdate('Groups', { ...state, groups })
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
