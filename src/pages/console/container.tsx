import { useNav } from '#A/hooks'
import { MyCheckbox } from '#C/checkbox/Checkbox'
import { MyHeader } from '#C/header/Header'
import { MyPagination } from '#C/pagination/Pagination'
import { useOnceRequest } from '#H/use-once'
import { useSerach } from '#H/use-search'
import { useWhyDidYouUpdate } from 'ahooks'
import { Radio, Space, Table } from 'antd'
import Column from 'antd/lib/table/Column'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { findAll, Message, Name, nameOptions, Search, typeOptions } from './service'
import './style.scss'

const myTypeOptions = [...typeOptions]
const myNameOptions = [...nameOptions]
const typeMapping: Record<string, string> = {}

typeOptions.forEach((e) => {
  typeMapping[e.value] = e.label
})

export function Console() {
  const { navigate } = useNav()
  const { name = 'SPIDER_CONTENT' } = useParams<{ name: Name }>()
  const [search, setSearch] = useSerach<Search>({ arrayNames: ['types'] })
  const { data, ...state } = useOnceRequest(() => findAll(name, search), {
    refreshDeps: [name, search],
  })
  const { data: msgs, page } = data || {}
  const onChange = (page: number, size: number = 20) => {
    setSearch({ page, size })
  }
  useWhyDidYouUpdate('Console', { name, ...search, ...state, msgs, page })
  return (
    <div className="Console">
      <MyHeader
        state={state}
        title="Console"
        children={
          <Space direction="vertical">
            <Radio.Group
              value={name}
              options={myNameOptions}
              onChange={(e) => navigate(`/console/${e.target.value}`)}
            />
            <MyCheckbox
              allSelectText="ALL"
              value={search.types}
              options={myTypeOptions}
              onChange={(values) => setSearch({ types: values })}
            />
          </Space>
        }
      />
      <Table
        dataSource={msgs}
        rowKey="id"
        rowClassName={rowClass}
        bordered={true}
        pagination={false}
      >
        <Column title="Date" key="date" render={renderDate} />
        <Column title="Type" key="Type" render={renderType} />
        <Column title="Content" key="content" render={renderContent} />
      </Table>
      {page && <MyPagination page={page} onChange={onChange} />}
    </div>
  )
}

function rowClass(row: Message) {
  return row.type
}

function renderDate(row: Message) {
  return spanText(dayjs(row.createOn).format('YYYY-MM-DD HH:mm:ss'))
}

function renderType(row: Message) {
  return spanText(typeMapping[row.type] ?? '未知')
}

function renderContent(row: Message) {
  return spanText(row.text)
}

function spanText(text: string) {
  return <span className="text">{text}</span>
}
