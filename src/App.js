import React from "react"
import { Router } from "react-router-dom"
import history from "@utils/history"
import { connect } from "react-redux"

import Layout from "./layouts"
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css"

// 国际化导入的组件
import { IntlProvider } from "react-intl"
// 导入antd国际化的组件
import { ConfigProvider } from "antd"
// 导入语言包
import { zh, en } from "./locales"
// 导入antd的语言包
import enUS from "antd/es/locale/en_US"
import zhCN from "antd/es/locale/zh_CN"

function App(props) {
  const locale = props.intl
  const message = locale === "en" ? en : zh

  const antLocale = locale === "en" ? enUS : zhCN
  return (
    <Router history={history}>
      <ConfigProvider locale={antLocale}>
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  )
}

export default connect((state) => ({ intl: state.intl }))(App)
