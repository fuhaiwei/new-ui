import { useNav } from '#A/hooks'
import Demo from '#C/demo/Demo'
import Groups from '#C/group/Group'
import Home from '#C/home/Home'
import {
  createFromIconfontCN,
  GithubOutlined,
  HomeOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { MenuInfo } from 'rc-menu/lib/interface'
import { Route, Routes } from 'react-router-dom'
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

function App() {
  const { pathname, navigate } = useNav()
  const onClick = ({ key, domEvent }: MenuInfo) => {
    if (key.startsWith('http') || domEvent.ctrlKey) {
      window.open(key)
    } else {
      navigate(key)
    }
  }
  console.log(`render: App, key=${pathname}`)
  return (
    <div className="App">
      <Layout>
        <Layout>
          <Header style={{ background: 'white' }}>
            <Menu onClick={onClick} selectedKeys={[pathname]} mode="horizontal" items={items} />
          </Header>
          <Content style={{ background: 'white' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/groups" element={<Groups />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default App
