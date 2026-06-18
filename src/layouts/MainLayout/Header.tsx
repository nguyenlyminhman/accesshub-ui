import { Layout, Button, Avatar, Dropdown, Space, Typography } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useAuthStore } from '@/stores/auth.store'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout

interface Props {
  collapsed: boolean
  onToggle: () => void
}

const AppHeader = ({ collapsed, onToggle }: Props) => {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ]

  return (
    <Header
      style={{
        padding: '0 16px',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 4px rgba(0,21,41,0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        style={{ fontSize: 16, width: 40, height: 40 }}
      />

      <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
        <Space style={{ cursor: 'pointer' }}>
          <Avatar size="small" icon={<UserOutlined />} />
          <Typography.Text>{user?.username ?? 'User'}</Typography.Text>
        </Space>
      </Dropdown>
    </Header>
  )
}

export default AppHeader