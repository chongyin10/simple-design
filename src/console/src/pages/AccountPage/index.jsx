import React, {useEffect, useState} from 'react'
import "./index.less"
import {Menu} from "antd"
import PersonalInformation from "./pages/PersonalInformation"
import AccountSettings from "./pages/AccountSettings"
import {useHistory, useLocation} from "react-router"
import {Link, Switch,Redirect,Route} from "react-router-dom"

const {  SubMenu } = Menu


const accountMenus = [
  {
    title:"个人信息",
    key:"/myAccount/personalInformation",
    component:PersonalInformation
  },
  {
    title:"账号设置",
    key:"/myAccount/accountSettings",
    component:AccountSettings
  }
]

function Index(props) {
  const location = useLocation()
  const history = useHistory()

  const [currentKey, setCurrentKey] = useState(location.pathname)

  const renderMenuMap = (list) =>
    list.map((item) => renderMenu(item)).filter((item) => item)

  // 判断是否有子菜单，渲染不同组件
  function renderMenu(item) {
    // 在渲染之前 做权限的处理 来决定是否渲染该项
    return item.children && item.children.length
      ? creatSubMenu(item)
      : createMenuItem(item)
  }

  // 创建可展开的第一级子菜单
  const creatSubMenu = (data) => {
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
    return (
      <Menu.Item className={'left-menu-item'} key={data.key} title={data.title}>
        <Link replace={true} to={data.key}>{subMenuTitle(data)}</Link>
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
    <div className={'account-page'}>
      <div className={'content'}>
        <div className={"left-menu-container"}>
          <div onClick={()=>{
            console.log(window.history);
            history.goBack()
          }} style={{cursor:'pointer',marginBottom:20}}>
            <span style={{fontWeight:'bold',fontSize:18}}>←</span>
            <span style={{marginLeft:10}}>返回</span>
          </div>
          <Menu
            mode="inline"
            onClick={handlerMenuClick}
            selectedKeys={[currentKey]}
            theme={"light"}
          >
            {renderMenuMap(accountMenus)}
          </Menu>
        </div>

        <div className={"account-page-content"}>
          <Switch>
            {
              accountMenus.map(item=>{
                return <Route key={item.key} path={item.key} component={item.component} />
              })
            }
            <Redirect from={'/myAccount'} to={'/myAccount/personalInformation'} />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Index
