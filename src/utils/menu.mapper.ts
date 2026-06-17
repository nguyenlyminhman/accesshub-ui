import type { MenuProps } from 'antd'
import * as AntdIcons from '@ant-design/icons'
import type { BackendMenu } from '@/features/auth/types/auth.type'
import type { NavigateFunction } from 'react-router-dom'
import React from 'react'

type AntdMenuItem = Required<MenuProps>['items'][number]


const IconCollection = (AntdIcons as unknown) as Record<string, React.ComponentType<any>>

const getIconByName = (iconName: string | null): React.ReactNode | undefined => {
  if (!iconName) return undefined

  const IconComponent = IconCollection[iconName]
  if (!IconComponent) return undefined

  return React.createElement(IconComponent)
}

export const mapBackendMenuToAntdItems = (
  menus: BackendMenu[],
  navigate: NavigateFunction
): AntdMenuItem[] => {
  return menus.map((menu) => {
    const icon = getIconByName(menu.icon)
    const hasChildren = menu.children && menu.children.length > 0

    if (hasChildren) {
      return {
        key: menu.path,
        icon,
        label: menu.title,
        children: mapBackendMenuToAntdItems(menu.children, navigate),
      }
    }

    return {
      key: menu.path,
      icon,
      label: menu.title,
      onClick: () => navigate(menu.path),
    }
  })
}