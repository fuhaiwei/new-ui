import { useNav } from '#A/hooks'
import Demo from '#P/demo/Demo'
import { Groups } from '#P/groups/container'
import Home from '#P/home/Home'
import NotFound from '#P/notfound/NotFound'
import {
  createFromIconfontCN,
  GithubOutlined,
  HomeOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { NavLink, Route, Routes } from 'react-router-dom'
import './App.scss'

const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_565515_1amye10w3sh.js',
})

const items: ItemType[] = [
  { label: 'Home', icon: <HomeOutlined />, key: '/' },
  { label: 'Demo', icon: <PlayCircleOutlined />, key: '/demo' },
  { label: 'Groups', icon: <IconFont type="icon-yinghua" />, key: '/groups' },
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
  console.log(`render: App, key=${pathname}`)
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Header style={{ background: 'white' }}>
            <Menu selectedKeys={[pathname]} mode="horizontal" items={items} />
          </Header>
          <Content style={{ background: 'white' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
