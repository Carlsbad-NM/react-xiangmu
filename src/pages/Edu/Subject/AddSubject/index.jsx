import React, { Component } from "react"
import { Card, Form, Input, Button, Select, Divider, message } from "antd"
import { Link } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { reqGetSubject, reqAddSecSubject } from "@api/edu/subject"

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 6 },
}

export default class index extends Component {
  page = 1
  state = {
    total: 0,
    items: [],
  }
  async componentDidMount() {
    const res = await reqGetSubject(this.page++, 10)
    this.setState(res)
  }
  handleGetSubject = async () => {
    const res = await reqGetSubject(this.page++, 10)
    const newItems = [...this.state.items, ...res.items]
    this.setState({
      items: newItems,
    })
  }
  onFinish = async (values) => {
    await reqAddSecSubject(values.subjectname, values.parentid)
    message.success("添加课程成功")
    this.props.history.push("/edu/subject/list")
  }
  render() {
    return (
      <Card
        title={
          <>
            <Link to="/edu/subject/list">
              <ArrowLeftOutlined />
            </Link>
            <span style={{ marginLeft: 20 }}>新增课程</span>
          </>
        }
      >
        <Form
          {...layout}
          name="subject"
          onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="课程分类名称"
            name="subjectname"
            rules={[{ required: true, message: "请输入课程分类" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="父级分类id"
            name="parentid"
            rules={[{ required: true, message: "请选择分类id" }]}
          >
            <Select
              dropdownRender={(menu) => {
                // menu就是之前渲染的数据
                return (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    {this.state.total > this.state.items.length ? (
                      <Button type="link">点击加载更多</Button>
                    ) : (
                      <div style={{ color: "red", marginLeft: 10 }}>
                        已加载所有数据
                      </div>
                    )}
                  </div>
                )
              }}
            >
              <Select.Option value={0} key={0}>
                一级菜单
              </Select.Option>
              {this.state.items.map((item) => (
                <Select.Option value={item._id} key={item._id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleAddSubject}
            >
              确认
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
