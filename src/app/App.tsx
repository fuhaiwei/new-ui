import { useNav } from '#A/hooks'
import { sessionQuery } from '#F/session/slice'
import { Console } from '#P/console/container'
import { Groups } from '#P/groups/container'
import NotFound from '#P/notfound/NotFound'
import { Session } from '#P/session/container'
import { Users } from '#P/users/container'
import {
  BarChartOutlined,
  createFromIconfontCN,
  GithubOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useEffect } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.scss'
import { appDispatch } from './store'

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
]

function addNavLink(item: any) {
  if (item.children) {
    item.children.forEach(addNavLink)
  } else if (item.key.startsWith('http')) {
    item.label = (
      <a href={item.key} target="_blank" rel="noopener noreferrer">
        {item.label}
      </a>
    )
  } else {
    item.label = <NavLink to={item.key}>{item.label}</NavLink>
  }
}

items.forEach(addNavLink)

function App() {
  const { pathname } = useNav()
  useEffect(() => {
    appDispatch(sessionQuery())
  }, [])
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
                <Route path=":name" />
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
