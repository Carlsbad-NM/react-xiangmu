import React, { Component } from "react"
import { Button, Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import * as qiniu from "qiniu-js"
import { nanoid } from "nanoid"
import { reqGetUploadToken } from "@api/edu/lesson"

export default class MyUpload extends Component {
  constructor() {
    super()

    this.state = {
      isShowUpload: true,
    }

    const jsonStr = localStorage.getItem("uploadToken")

    if (jsonStr) {
      this.tokenObj = JSON.parse(jsonStr)
      return
    }
    this.tokenObj = {}
  }
  handleBeforeUpload = (file, fileList) => {
    const MAX_SIZE = 5 * 1024 * 1024
    return new Promise(async (resolve, reject) => {
      if (file.size > MAX_SIZE) {
        message.warning("上传文件需小于5M")
        return reject()
      }
      if (this.tokenObj.expires && this.tokenObj.expires > Date.now()) {
        return resolve()
      }
      const res = await reqGetUploadToken()
      res.expires = Date.now() + res.expires * 1000 - 2 * 60 * 1000
      this.tokenObj = res
      const jsonStr = JSON.stringify(res)
      localStorage.setItem("uploadToken", jsonStr)
      resolve()
    })
  }
  handleCustomRequest = ({ file, onProgress, onError, onSuccess }) => {
    // 创建上传过程触发回调函数的对象
    const observer = {
      //上传过程中触发的回调函数
      next(res) {
        // res中有total属性,total中有percent属性,表示上传的进度
        const percent = res.total.percent
        // 把进度传入到onProgress中,可以有进度条效果
        onProgress({
          percent,
        })
      },
      //上传失败触发的回调函数
      error(err) {
        // 上传失败会有一个失败的效果
        console.log("上传错误", err)
        onError(err)
      },
      // 上传成功触发的回调函数
      complete: (res) => {
        // 上传成功,会有一个成功的效果
        console.log("上传完成", res)
        onSuccess(res)
        this.setState({
          isShowUpload: false,
        })

        this.props.onChange(`http://qfek6fw0b.hn-bkt.clouddn.com/${res.key}`)
      },
    }

    const putExtra = {
      mimeType: ["video/*"], //用来限定上传文件类名
    }
    // 创建config对象
    const config = {
      region: qiniu.region.z2, // 选择上传域名区域 z2表示华南
    }
    const key = nanoid(10) //生成一个长度为10的id,保证是唯一的

    // token 需要给本地服务器发送请求获取 (时效两个小时)
    const token = this.tokenObj.uploadToken

    const observable = qiniu.upload(
      file, // 上传的文件
      key, //最终上传之后的文件资源名 (保证唯一) 使用nanoid库,生成这个key
      token, //上传验证信息，前端通过接口请求后端获得
      putExtra,
      config
    )
    // 上传开始
    this.subscription = observable.subscribe(observer)
  }
  componentWillUnmount() {
    // 上传取消
    this.subscription && this.subscription.unsubscribe()
  }

  handleRemove = () => {
    this.props.onChange("")
    this.setState({
      isShowUpload: true,
    })
  }
  render() {
    return (
      <Upload
        // beforeUpload 是上传视频之前调用的函数，实现给本地服务器发送请求，获取token
        // beforeUpload 返回false/失败的promise,后面的customRequest就执行了
        beforeUpload={this.handleBeforeUpload}
        // customRequest 是真正将视频上传到七牛云的时候执行的
        customRequest={this.handleCustomRequest}
        // 当删除上传视频的时候触发
        onRemove={this.handleRemove}
      >
        {this.state.isShowUpload && (
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        )}
      </Upload>
    )
  }
}
