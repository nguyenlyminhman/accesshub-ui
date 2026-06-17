import { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMenuStore } from '@/stores/menu.store'
import { mapBackendMenuToAntdItems } from '@/utils/menu.mapper'
import { icons } from 'antd/es/image/PreviewGroup'

const { Sider } = Layout

interface Props {
  collapsed: boolean
}

const Sidebar = ({ collapsed }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const backendMenus = useMenuStore((s) => s.menus)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location.pathname])
  
  const menus = [
  {
    id: 1,
    path: "/dashboard",
    title: "Dashboard",
    icon: null,
    children: []
  },
  {
    id: 2,
    path: "/users",
    title: "User Management",
    icon: null,
    children: [
      {
        id: 3,
        path: "/users/list",
        title: "User List",
        icon: null,
        children: []
      },
      {
        id: 4,
        path: "/users/create",
        title: "Create User",
        icon: null,
        children: []
      },
    ],
  },
];


  const menuItems = mapBackendMenuToAntdItems(menus, navigate)

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      style={{ overflow: 'auto', height: '100vh', position: 'sticky', top: 0 }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: collapsed ? 14 : 18,
          fontWeight: 700,
          transition: 'all 0.3s',
        }}
      >
        {collapsed ? 'A' : 'MyApp'}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={[]} // hoặc derive từ path hiện tại
        items={menuItems}
      />
    </Sider>
  )
}

export default Sidebar