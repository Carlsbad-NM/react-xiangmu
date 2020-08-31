import React, { Component } from "react"
import { Layout, Menu, Breadcrumb } from "antd"
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { defaultRoutes } from "@conf/routes"
import icons from "@conf/icons"

const { SubMenu } = Menu

@withRouter
@connect((state) => ({
  permissionList: state.user.permissionList,
}))
class SiderMenu extends Component {
  renderMenu = (routes) => {
    return routes.map((route) => {
      const Icons = icons[route.icon]
      if (route.hidden) return
      if (route.children && route.children.length) {
        return (
          <SubMenu key={route.path} icon={<Icons />} title={route.name}>
            {route.children.map((secItem) => {
              if (secItem.hidden) return null
              return (
                <Menu.Item key={route.path + secItem.path}>
                  <Link to={route.path + secItem.path}>{secItem.name}</Link>
                </Menu.Item>
              )
            })}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={route.path} icon={<Icons />}>
            {/* <Link to={route.path}>{route.name}</Link> */}
            {route.path === "/" ? <Link to="/">{route.name}</Link> : route.name}
          </Menu.Item>
        )
      }
    })
  }
  render() {
    const pathname = this.props.location.pathname
    let arr = pathname.split("/")
    const openKey = "/" + arr[1]
    // console.log(openKey)
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openKey]}
        mode="inline"
      >
        {this.renderMenu(defaultRoutes)}
        {this.renderMenu(this.props.permissionList)}
        {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
        Option 1
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        Option 2
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="User">
        <Menu.Item key="3">Tom</Menu.Item>
        <Menu.Item key="4">Bill</Menu.Item>
        <Menu.Item key="5">Alex</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
        <Menu.Item key="6">Team 1</Menu.Item>
        <Menu.Item key="8">Team 2</Menu.Item>
      </SubMenu>
      <Menu.Item key="9" icon={<FileOutlined />} /> */}
      </Menu>
    )
  }
}

export default SiderMenu
