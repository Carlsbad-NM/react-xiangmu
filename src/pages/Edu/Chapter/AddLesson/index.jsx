import React, { Component } from "react"
import { Card, Form, Input, Button, Switch, message } from "antd"
import { Link } from "react-router-dom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { addLesson } from "@api/edu/lesson"

import MyUpload from "@comps/Upload"

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 6 },
}

export default class AddLesson extends Component {
  onFinish = async (values) => {
    const { title, free, video } = values
    const chapterId = this.props.location.state._id
    const data = {
      chapterId,
      title,
      free,
      video,
    }

    await addLesson(data)
    message.success("课时添加成功")
    this.props.history.push("/edu/chapter/list")
  }
  render() {
    return (
      <Card
        title={
          <>
            <Link to="/edu/chapter/list">
              <ArrowLeftOutlined />
            </Link>
            <span style={{ marginLeft: 20 }}>新增课时</span>
          </>
        }
      >
        <Form
          {...layout}
          name="subject"
          onFinish={this.onFinish}
          // onFinishFailed={onFinishFailed}
          initialValues={{ free: true }}
        >
          <Form.Item
            label="课时名称"
            name="title"
            rules={[{ required: true, message: "请输入课程分类" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            valuePropName="checked"
            label="是否免费"
            name="free"
            rules={[{ required: true, message: "选择是否免费" }]}
          >
            <Switch
              checkedChildren="开启"
              unCheckedChildren="关闭"
              defaultChecked
            />
          </Form.Item>

          <Form.Item
            label="上传视频"
            name="video"
            rules={[{ required: true, message: "请上传相应视频" }]}
          >
            <MyUpload></MyUpload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
