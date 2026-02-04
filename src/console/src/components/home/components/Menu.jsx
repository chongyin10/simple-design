import React, { useState, useEffect } from "react"
import "./Menu.less"
import menus from "../../../config/menus"
import { Menu, Divider } from "antd"
import { Link } from "react-router-dom"
import { useLocation } from "react-router"
import { hasModulePermission } from "../../../utils/storage"
import intl from "react-intl-universal";

const { SubMenu } = Menu

const MenuLeft = (props) => {
    const location = useLocation()
    const [currentKey, setCurrentKey] = useState(location.pathname)

    const handleFilter = (route) => {
        // console.log(route, 'route')
        // 过滤没有权限的页面
        return (!route.permission || hasModulePermission((route.permission)))
    }

    const filterMenuItem = (item) => {
        if (handleFilter(item)) {
            return true
        }
        return false
    }

    const renderMenuMap = (list) => {
        // console.log(list, 'list')
        return list.map((item) => renderMenu(item)).filter((item) => item)
    }

    // 判断是否有子菜单，渲染不同组件
    function renderMenu(item) {
        // 在渲染之前 做权限的处理 来决定是否渲染该项
        return (item.children && item.children.length > 0) ? creatSubMenu(item) : createMenuItem(item)
    }

    // 创建可展开的第一级子菜单
    const creatSubMenu = (data) => {
        const isShow = filterMenuItem(data)
        if (!isShow) return null
        const menuItemList = []
        data.children.forEach((item) => {
            const result = renderMenu(item)
            result && menuItemList.push(result)
        })
        return menuItemList.length > 0 ? (
            <SubMenu key={data.key} title={subMenuTitle(data)}>
                {menuItemList}
            </SubMenu>
        ) : null
    }

    // 创建可跳转的多级子菜单
    const createMenuItem = (data) => {
        const isShow = filterMenuItem(data)
        if (!isShow) return null
        if (data.hideInMenu) return null
        if(data.hidden) return null
        return (
            <Menu.Item className={'left-menu-item'} key={data.key} title={data.title}>
                <Link to={data.key}>{subMenuTitle(data)}</Link>
            </Menu.Item>
        )
    }

    const subMenuTitle = (data) => {
        const { icon: MenuIcon } = data
        return (
            <span >
                {!!MenuIcon && <MenuIcon style={{ width: 17, height: 17 }} />}
                <span>{data.title}</span>
            </span>
        )
    }

    const handlerMenuClick = ({ item, key, keyPath }) => {
        setCurrentKey(key)
    }

    useEffect(() => {
        setCurrentKey(location.pathname)
    }, [location.pathname])

    return (
        <div className="left-menu-container">
            <div className="app-name">
                {intl.get('WORKBENCH')}
            </div>
            <Divider className="app-divider" />
            <Menu
                mode="inline"
                defaultOpenKeys={['/cost', '/instancemanage']}
                onClick={handlerMenuClick}
                selectedKeys={[currentKey]}
                theme={"light"}
            >
                {renderMenuMap(menus())}
            </Menu>
        </div>
    )
}

export default MenuLeft
