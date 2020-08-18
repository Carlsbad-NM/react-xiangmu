import React, { Component } from "react"
import { Button, Table, Tooltip, Input, message } from "antd"
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons"
import { connect } from "react-redux"
import {
  getSubjectList,
  getSecSubjectList,
  updateSubjectList,
} from "./redux/actions"
import { reqUpdateSubject } from "@api/edu/subject"

import "./index.less"

@connect(
  (state) => ({
    subjectList: state.subjectList,
  }),
  { getSubjectList, getSecSubjectList, updateSubjectList }
)
class Subject extends Component {
  state = {
    page: 1,
    subjectid: "",
    title: "",
  }
  componentDidMount() {
    this.props.getSubjectList(1, 10)
  }

  handleChange = (page, pageSize) => {
    this.setState({
      page: page,
    })
    this.props.getSubjectList(page, pageSize)
  }
  handleShowSizeChange = (page, pageSize) => {
    this.setState({
      page: page,
    })
    this.props.getSubjectList(page, pageSize)
  }
  handleExpand = (expanded, record) => {
    if (expanded) {
      this.props.getSecSubjectList(record._id)
    }
  }
  handleToAdd = () => {
    this.props.history.push("/edu/subject/add")
  }
  handleUpdate = ({ _id, title }) => () => {
    this.setState({
      subjectid: _id,
      title: title,
    })
    this.title = title
  }
  handleUpdateChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  }
  handleCancle = () => {
    this.setState({
      subjectid: "",
      title: "",
    })
  }
  handleConfirm = (record) => {
    if (!this.state.title.trim()) {
      message.warning("请输入正确标题名称")
      return
    }
    if (this.state.title.trim() === this.title) {
      message.warning("标题未改变")
      this.handleCancle()
      return
    }
    let id = this.state.subjectid
    let title = this.state.title
    // reqUpdateSubject(id, title)
    this.props.updateSubjectList(id, title)
    this.handleCancle()
    message.success("更新标题成功")
  }
  render() {
    const columns = [
      // title: 表示这一列的标题
      // dataIndex: 表示这一列中要展示data数据的中哪一项值
      // key: 唯一id
      {
        title: "分类名称",
        // dataIndex: "title",
        key: "name",
        render: (record) => {
          if (this.state.subjectid === record._id) {
            return (
              <Input
                style={{ width: 300 }}
                value={this.state.title}
                onChange={this.handleUpdateChange}
              ></Input>
            )
          }
          return record.title
        },
      },
      {
        title: "操作",
        key: "x",
        render: (record) => {
          if (this.state.subjectid === record._id) {
            return (
              <>
                <Button
                  type="primary"
                  style={{ marginRight: 10 }}
                  onClick={this.handleConfirm}
                >
                  确认
                </Button>
                <Button type="danger" onClick={this.handleCancle}>
                  取消
                </Button>
              </>
            )
          } else {
            return (
              <>
                <Tooltip title="更新课程">
                  <Button
                    type="primary"
                    icon={<FormOutlined />}
                    style={{ marginRight: 20, width: 40 }}
                    onClick={this.handleUpdate(record)}
                  ></Button>
                </Tooltip>
                <Tooltip title="删除课程">
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    style={{ width: 40 }}
                  ></Button>
                </Tooltip>
              </>
            )
          }
        },
        width: 200,
      },
    ]
    return (
      <div className="subject">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="subject-btn"
          onClick={this.handleToAdd}
        >
          新建
        </Button>

        <Table
          columns={columns}
          expandable={{
            // expandedRowRender: (record) => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // rowExpandable: (record) => record.name !== "Not Expandable",

            // 当父级内部有childern属性时，就会自动生成展开按钮
            onExpand: this.handleExpand,
          }}
          dataSource={this.props.subjectList.items}
          rowKey="_id"
          pagination={{
            current: this.state.page,
            total: this.props.subjectList.total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15"],
            showQuickJumper: true,
            defaultPageSize: 10,
            onChange: this.handleChange,
            onShowSizeChange: this.handleShowSizeChange,
          }}
        />
      </div>
    )
  }
}

export default Subject
