import React, { Component } from "react"
import { connect } from "react-redux"
import { loginSuccessSync } from "@redux/actions/login"

@connect(null, { loginSuccessSync })
class Oauth extends Component {
  componentDidMount() {
    // 获取token --> 此时服务器已经获取到github用户数据，并注册了用户，返回token
    const token = this.props.location.search.split("=")[1]
    // 更新redux token
    this.props.loginSuccessSync({ token })
    // 保存到本地
    localStorage.setItem("user_token", token)
    // 跳转到首页
    this.props.history.replace("/")
  }

  render() {
    return <div>...正在授权</div>
  }
}

export default Oauth
