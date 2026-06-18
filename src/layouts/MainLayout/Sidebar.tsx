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

const CONFIG_MENUS = [
  { title: "Dashboard", uiCode: "ui_0", url: "/dashboard", icon: <DashboardOutlined /> },
  { title: "Organization", uiCode: "ui_1", url: "/organization", icon: <DatabaseOutlined /> },  
  { title: "Project", uiCode: "ui_2", url: "/project", icon: <LockOutlined /> },
  { title: "Authentication", uiCode: "ui_4", url: "/authentication", icon: <LaptopOutlined /> },
  { title: "Department", uiCode: "ui_5", url: "/organization/department", icon: <DatabaseOutlined /> },
  { title: "User", uiCode: "ui_6", url: "/organization/user", icon: <DatabaseOutlined /> },
]

const feMenuMap = new Map(CONFIG_MENUS.map(item => [item.uiCode, item.icon]));

const getParentKeysByPath = (items: any[], currentPath: string): string[] => {
  if (!items) return [];
  for (const item of items) {
    if (item.children) {
      const hasChild = item.children.some((child: any) => child.key === currentPath);
      if (hasChild) return [item.key];
      
      const subParentKeys = getParentKeysByPath(item.children, currentPath);
      if (subParentKeys.length > 0) return [item.key, ...subParentKeys];
    }
  }
  return [];
};

const Sidebar = ({ collapsed }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const backendMenus = useMenuStore((s) => s.menus)
  
  const [selectedKeys, setSelectedKeys] = useState<string[]>([location.pathname])

  const [openKeys, setOpenKeys] = useState<string[]>([])

  const menuItems = useMemo(() => {
    if (!backendMenus || backendMenus.length === 0) return [];

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
          id: 0,
          ...dashboardInFe,
          parentId: null,
          permissions: null,
          sortOrder: -1
        });
      }
    }

    return mapBackendMenuToAntdItems(finalMenu, navigate);
  }, [backendMenus, navigate]);

  useEffect(() => {
    setSelectedKeys([location.pathname])
    const parentKeys = getParentKeysByPath(menuItems || [], location.pathname);
    if (!collapsed && parentKeys.length > 0) {
      setOpenKeys((prev) => {
        const uniqueKeys = new Set([...prev, ...parentKeys]);
        return Array.from(uniqueKeys);
      });
    }
  }, [location.pathname, menuItems, collapsed]);

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
        {collapsed ? 'ACH' : 'Access Hub'}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={collapsed ? [] : openKeys}
        onOpenChange={(keys) => setOpenKeys(keys)}
        items={menuItems}
      />
    </Sider>
  )
}

export default Sidebar