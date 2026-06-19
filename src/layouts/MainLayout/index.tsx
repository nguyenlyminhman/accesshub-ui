import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Card, Layout } from 'antd'
import Sidebar from './Sidebar'
import AppHeader from './Header'

const { Content } = Layout

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <AppHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
        <Content
          style={{
            margin: '0px',
            padding: '24px',
            background: '#e7e7e7',
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          <Card variant="borderless">
            <Outlet />
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout