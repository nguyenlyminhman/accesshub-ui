import { useEffect, useState, useMemo } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMenuStore } from '@/stores/menu.store'
import { mapBackendMenuToAntdItems } from '@/utils/menu.mapper'
import {
  LockOutlined,
  DatabaseOutlined,
  LaptopOutlined,
  DashboardOutlined
} from "@ant-design/icons";

const { Sider } = Layout

interface Props {
  collapsed: boolean
}

// --- TỐI ƯU 1: Đưa mảng định nghĩa cấu hình tĩnh ra NGOÀI Component ---
// Việc này giúp tránh tạo lại mảng và Map ở mỗi lần component render.
const CONFIG_MENUS = [
  { title: "Dashboard", uiCode: "ui_0", url: "/dashboard", icon: <DashboardOutlined /> },
  { title: "Organization", uiCode: "ui_1", url: "/organization", icon: <DatabaseOutlined /> },
  { title: "Project", uiCode: "ui_2", url: "/project", icon: <LockOutlined /> },
  { title: "Authentication", uiCode: "ui_4", url: "/authentication", icon: <LaptopOutlined /> }
]

const feMenuMap = new Map(CONFIG_MENUS.map(item => [item.uiCode, item.icon]));

const Sidebar = ({ collapsed }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const backendMenus = useMenuStore((s) => s.menus)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location.pathname]);
  
  useEffect(() => {

    const currentMenu = backendMenus?.find(item => item.url === location.pathname);

    if (currentMenu) {
      setSelectedKeys([currentMenu.uiCode]);
    } else if (location.pathname === '/dashboard') {
      setSelectedKeys(['ui_0']);
    } else {
      setSelectedKeys([location.pathname]);
    }
  }, [location.pathname, backendMenus]);

  const menuItems = useMemo(() => {
    if (!backendMenus) return [];

    let finalMenu = backendMenus.map(beItem => ({
      ...beItem,
      icon: feMenuMap.get(beItem.uiCode) || null
    }));

    const dashboardInBe = finalMenu.find(item => item.uiCode === "ui_0");

    if (dashboardInBe) {
      finalMenu = [dashboardInBe, ...finalMenu.filter(item => item.uiCode !== "ui_0")];
    } else {
      const dashboardInFe = CONFIG_MENUS.find(item => item.uiCode === "ui_0");
      if (dashboardInFe) {
        finalMenu.unshift({
          ...dashboardInFe,
          parentId: null,
          permissions: null,
          sortOrder: -1
        });
      }
    }

    return mapBackendMenuToAntdItems(finalMenu, navigate);

  }, [backendMenus, navigate]);

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
        defaultOpenKeys={[]}
        items={menuItems}
      />
    </Sider>
  )
}

export default Sidebar