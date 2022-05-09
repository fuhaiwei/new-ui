import { useNav } from '#A/hooks'
import { MyCheckbox } from '#C/checkbox/Checkbox'
import { MyHeader } from '#C/header/Header'
import { MyPagination } from '#C/pagination/Pagination'
import { useSerach } from '#H/use-search'
import { useRequest } from 'ahooks'
import { Radio, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { allNames, allTypes, findAll, Message, Name, Search } from './service'

const typeOptions = allTypes.map((e) => ({ label: e, value: e }))

export function Console() {
  const { navigate } = useNav()
  const { name = 'SPIDER_CONTENT' } = useParams<{ name: Name }>()
  const [search, setSearch] = useSerach<Search>(undefined, { arrayNames: ['types'] })
  const { data, ...state } = useRequest(() => findAll(name, search), {
    refreshDeps: [name, search],
  })
  const { data: msgs, page } = data || {}
  const onChange = (page: number, size: number = 20) => {
    setSearch({ page, size })
  }
  console.log(`render Console: msgs=${msgs !== undefined}`)
  return (
    <div className="Console">
      <MyHeader
        state={state}
        title="Console"
        children={
          <Space direction="vertical">
            <Radio.Group value={name} onChange={(e) => navigate(`/console/${e.target.value}`)}>
              {allNames.map((e) => (
                <Radio key={e} value={e}>
                  {e}
                </Radio>
              ))}
            </Radio.Group>
            <MyCheckbox
              allSelectText="ALL"
              value={search.types}
              options={typeOptions}
              onChange={(values) => setSearch({ types: values })}
            />
          </Space>
        }
      />
      <Table dataSource={msgs} rowKey="id" pagination={false}>
        <Column width={170} title="Date" key="date" render={renderDate} />
        <Column title="Type" key="Type" render={renderType} />
        <Column title="Content" key="content" render={renderContent} />
      </Table>
      {page && <MyPagination page={page} onChange={onChange} />}
    </div>
  )
}

function renderDate(row: Message) {
  return dayjs(row.createOn).format('YYYY-MM-DD HH:mm:ss')
}

function renderType(row: Message) {
  return row.type
}

function renderContent(row: Message) {
  return row.text
}
