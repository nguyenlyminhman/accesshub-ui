import type { MenuProps } from 'antd'
import type { MenuList } from '@/features/auth/types/auth.type'
import type { ReactNode } from 'react';

type CustomMenuItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: CustomMenuItem[];
  parentId: number | null;
};

export const mapBackendMenuToAntdItems = (
  menus: MenuList[],
  navigate: (url: string) => void
): MenuProps['items'] => {
  if (!menus || menus.length === 0) return [];

  const menuMap: { [key: number]: CustomMenuItem } = {};
  const rootItems: CustomMenuItem[] = [];

  const sortedMenus = [...menus].sort((a, b) => a.sortOrder - b.sortOrder);

  sortedMenus.forEach((menu: any) => {
    menuMap[menu.id] = {
      key: menu.url, // QUAN TRỌNG: Dùng url làm key để đồng bộ màu sắc với router
      label: menu.title,
      icon: menu.icon || undefined, 
      parentId: menu.parentId,
      onClick: () => navigate(menu.url), 
    };
  });

  sortedMenus.forEach((menu: any) => {
    const currentItem = menuMap[menu.id];
    
    if (menu.parentId !== null && menuMap[menu.parentId]) {
      const parentItem = menuMap[menu.parentId];
      
      if (!parentItem.children) {
        parentItem.children = [];
      }
      
      delete parentItem.onClick;       
      parentItem.children.push(currentItem);
    } else {
      rootItems.push(currentItem);
    }
  });

  const dashboardIndex = rootItems.findIndex(item => item.key === "/dashboard");
  if (dashboardIndex > 0) {
    const [dashboardItem] = rootItems.splice(dashboardIndex, 1);
    rootItems.unshift(dashboardItem);
  }

  return rootItems as MenuProps['items'];
};