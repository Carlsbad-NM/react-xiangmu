import React, { useState, useEffect } from "react"
import { Form, Input, Select, Cascader, Button } from "antd"
import { reqGetAllSubject, reqGetSecSubject } from "@api/edu/subject"
import { reqGetAllTeacherList } from "@api/edu/teacher"
import { connect } from "react-redux"
import { getAllCourseList } from "../redux"

// 国际化的组件和hooks
import { FormattedMessage, useIntl } from "react-intl"

import "./index.less"

const { Option } = Select

function SearchForm(props) {
  const [form] = Form.useForm()
  const intl = useIntl()

  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    async function fetchData() {
      // await reqGetAllSubject()
      // await reqGetAllTeacherList()
      const [subject, teacher] = await Promise.all([
        reqGetAllSubject(),
        reqGetAllTeacherList(),
      ])
      setSubjects(subject)
      setTeachers(teacher)

      const optionList = subject.map((item) => {
        return {
          value: item._id,
          label: item.title,
          isLeaf: false,
        }
      })
      setOptions(optionList)
    }

    fetchData()
  }, [])

  // const [options, setOptions] = useState([
  //   {
  //     value: "zhejiang",
  //     label: "Zhejiang",
  //     isLeaf: false,
  //   },
  //   {
  //     value: "jiangsu",
  //     label: "Jiangsu",
  //     isLeaf: false,
  //   },
  // ])

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  const loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    // load options lazily
    const res = await reqGetSecSubject(targetOption.value)
    targetOption.loading = false
    if (res.items.length) {
      targetOption.children = res.items.map((item) => {
        return {
          value: item._id,
          label: item.title,
        }
      })
    } else {
      targetOption.isLeaf = true
    }
    setOptions([...options])
  }
  const resetForm = () => {
    form.resetFields()
  }

  const onFinish = () => {
    props.getAllCourseList()
  }
  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item name="title" label={<FormattedMessage id="title" />}>
        <Input
          placeholder={intl.formatMessage({
            id: "title",
          })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={intl.formatMessage({
            id: "teacher",
          })}
          style={{ width: 250, marginRight: 20 }}
        >
          {/* <Option value="lucy1">Lucy1</Option>
          <Option value="lucy2">Lucy2</Option>
          <Option value="lucy3">Lucy3</Option> */}
          {teachers.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          // changeOnSelect
          placeholder={intl.formatMessage({
            id: "subject",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          <FormattedMessage id="searchBtn" />
        </Button>
        <Button onClick={resetForm}>
          <FormattedMessage id="resetBtn" />
        </Button>
      </Form.Item>
    </Form>
  )
}

export default connect(null, { getAllCourseList })(SearchForm)
