import type { MenuProps } from 'antd'
import * as AntdIcons from '@ant-design/icons'
import type { MenuList } from '@/features/auth/types/auth.type'
import type { NavigateFunction } from 'react-router-dom'
import React, { type ReactNode } from 'react'

type AntdMenuItem = Required<MenuProps>['items'][number]


const IconCollection = (AntdIcons as unknown) as Record<string, React.ComponentType<any>>

const getIconByName = (iconName: string | null): React.ReactNode | undefined => {
  if (!iconName) return undefined

  const IconComponent = IconCollection[iconName]
  if (!IconComponent) return undefined

  return React.createElement(IconComponent)
}

type CustomMenuItem = {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  children?: CustomMenuItem[];
  parentId: number | string | null;
};

export const mapBackendMenuToAntdItems = (
  menus: MenuList[],
  navigate: (url: string) => void
): MenuProps['items'] => { // Sử dụng MenuProps['items'] làm kiểu trả về chuẩn cho Antd Menu
  if (!menus || menus.length === 0) return [];

  // Bước A: Sử dụng CustomMenuItem để định nghĩa Map, tránh lỗi từ Union Type của Antd
  const menuMap: { [key: string]: CustomMenuItem } = {};
  const rootItems: CustomMenuItem[] = [];

  const sortedMenus = [...menus].sort((a, b) => a.sortOrder - b.sortOrder);

  // Bước B: Khởi tạo dữ liệu vào Map
  sortedMenus.forEach((menu) => {
    menuMap[menu.uiCode] = {
      key: menu.uiCode, 
      label: menu.title,
      icon: menu.icon || undefined, 
      parentId: menu.parentId,
      onClick: () => navigate(menu.url), 
    };
  });

  // Bước C: Dựng cây (Lúc này parentItem đã được định danh rõ ràng thuộc tính children)
  sortedMenus.forEach((menu) => {
    const currentItem = menuMap[menu.uiCode];
    
    if (menu.parentId !== null && menuMap[String(menu.parentId)]) {
      const parentItem = menuMap[String(menu.parentId)];
      
      if (!parentItem.children) {
        parentItem.children = [];
      }
      
      // Node cha thì xóa onClick đi để Antd tự xử lý đóng/mở SubMenu
      delete parentItem.onClick; 
      
      parentItem.children.push(currentItem);
    } else {
      rootItems.push(currentItem);
    }
  });

  // Bước D: Đảm bảo "ui_0" luôn nằm ở vị trí đầu tiên
  const dashboardIndex = rootItems.findIndex(item => item.key === "ui_0");
  if (dashboardIndex > 0) {
    const [dashboardItem] = rootItems.splice(dashboardIndex, 1);
    rootItems.unshift(dashboardItem);
  }

  // Trả về rootItems (TypeScript sẽ tự động ép kiểu từ CustomMenuItem[] sang MenuProps['items'] một cách an toàn)
  return rootItems as MenuProps['items'];
};