import React, { Component } from "react"
import { connect } from "react-redux"
import { getUserInfo, getUserMenu, user } from "./redux"

@connect((state) => ({ user: state.user }), { getUserInfo, getUserMenu })
class Authorized extends Component {
  async componentDidMount() {
    await Promise.all([this.props.getUserInfo(), this.props.getUserMenu()])
  }

  render() {
    return this.props.render(this.props.user)
  }
}

export default Authorized
