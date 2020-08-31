import React, { Component, Suspense } from "react"
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

import { connect } from "react-redux"
import { Route, withRouter } from "react-router-dom"
import SiderMenu from "../SiderMenu"
import components from "@conf/asyncComps"
import { defaultRoutes } from "@conf/routes"
import "./index.less"

import logo from "@assets/images/logo.png"

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

@withRouter
@connect((state) => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({ collapsed })
  }

  renderRoute = (routes, path) => {
    return routes.map((item) => {
      if (item.component) {
        const MyComponent = components[item.component]()

        return (
          <Route
            path={path ? path + item.path : item.path}
            component={MyComponent}
            exact
            key={item.path}
          ></Route>
        )
      }

      if (item.children && item.children.length) {
        return this.renderRoute(item.children, item.path)
      }
    })
  }

  render() {
    const { name, avatar, permissionList } = this.props.user
    const pathname = this.props.location.pathname

    const reg = /[/][a-z]*/g
    const matchArr = pathname.match(reg)

    const firstPath = matchArr[0]
    const secPath = matchArr[1]
    const thirdPath = matchArr[2] || ""

    let firstName
    let secName
    secPath &&
      permissionList.forEach((route) => {
        if (route.path === firstPath) {
          firstName = route.name

          route.children.forEach((secRoute) => {
            if (secRoute.path === secPath + thirdPath) {
              secName = secRoute.name
            }
          })
        }
      })
    console.log(firstName, secName)

    return (
      <Layout className="layout">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={logo} alt="" />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>
          {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
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
            <Menu.Item key="9" icon={<FileOutlined />} />
          </Menu> */}
        </Sider>

        <Layout className="site-layout">
          <Header className="layout-header">
            <img src={avatar} alt="" />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className="layout-nav">
              {!firstName ? (
                <div>首页</div>
              ) : (
                <Breadcrumb>
                  <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{secName}</Breadcrumb.Item>
                </Breadcrumb>
              )}
              <div style={{ fontSize: 24, fontWeight: "bold" }}>{secName}</div>
            </div>

            <div className="layout-content">
              <Suspense fallback={<div>正在加载...</div>}>
                {this.renderRoute(defaultRoutes)}
                {this.renderRoute(permissionList)}
              </Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default PrimaryLayout
