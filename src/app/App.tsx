import { useNav } from '#A/hooks'
import { call } from '#A/store'
import { sessionQuery } from '#F/session/slice'
import { useOnceService } from '#H/use-once'
import { Console } from '#P/console/container'
import { Groups } from '#P/groups/container'
import { NotFound } from '#P/notfound/NotFound'
import { Session } from '#P/session/container'
import { Users } from '#P/users/container'
import {
  BarChartOutlined,
  createFromIconfontCN,
  GithubOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useWhyDidYouUpdate } from 'ahooks'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'

const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_565515_1amye10w3sh.js',
})

const items: ItemType[] = [
  { label: 'Groups', icon: <IconFont type="icon-yinghua" />, key: '/groups' },
  { label: 'Session', icon: <UserOutlined />, key: '/session' },
  { label: 'Console', icon: <BarChartOutlined />, key: '/console' },
  { label: 'Users', icon: <UserOutlined />, key: '/users' },
  {
    label: 'Source',
    icon: <GithubOutlined />,
    children: [
      { label: 'Github - UI', key: 'https://github.com/fuhaiwei/new-ui' },
      { label: 'Github - Server', key: 'https://github.com/mingzuozhibi/mzzb-server' },
      { label: 'Github - Spider', key: 'https://github.com/mingzuozhibi/mzzb-spider' },
      { label: 'Github - Admin', key: 'https://github.com/mingzuozhibi/mzzb-admin' },
    ],
  } as any,
].map(defindItem)

const service = () => call(sessionQuery())

function App() {
  const { pathname } = useNav()
  useOnceService(service)
  useWhyDidYouUpdate('App', { pathname })
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Header style={{ background: 'white' }}>
            <Menu selectedKeys={[pathname]} mode="horizontal" items={items} />
          </Header>
          <Content style={{ background: 'white' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/groups" />} />
              <Route path="/users" element={<Users />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/session" element={<Session />} />
              <Route path="/console" element={<Console />}>
                <Route path=":name" element={null} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App

function defindItem(item: any) {
  if (item.children) {
    item.children.forEach(defindItem)
  } else if (item.key.startsWith('http')) {
    item.label = (
      <a href={item.key} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    )
  } else {
    item.label = <Link to={item.key}>{item.label}</Link>
  }
  return item
}
