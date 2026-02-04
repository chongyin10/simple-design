import React from "react";
import feedbackApi from "../api/feedbackApi";
import {  Modal, Form, Input, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import { version } from 'antd';

import { userId, teamId } from '../../../utils/cookie';

import "./Feedback.css"

const { TextArea } = Input

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

class Feedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      visible: this.props.visible, //由父层控制
      listVisible: true,
      uploadView: false, //
      fileList: [
        //上传文件列表
      ],
    }
    this.formRef = React.createRef()
  }
  handleCancel = () => this.setState({ previewVisible: false })

  //问题项目
  problemItemClick = (e) => {
    this.setState("uploadView", true)
  }

  //取消提交
  ModalhandleCancel = () => {
    this.props.onCancel()
    this.setState({
      listVisible: true,
      fileList: [],
    })
    this.formRef.current.resetFields() //重置Form表单的内容
  }

  //提交表单
  onOk = () => {
    const form = this.formRef.current
    const _this = this

    form
      .validateFields()
      .then((values) => {
        _this.setState({
          listVisible: true,
        })

        let vals = _this.dataFormat(values)
        feedbackApi.saveFeedback(vals)
          .then(function (res) {
            form.resetFields()
            Modal.success({
              title: '您的反馈已成功提交',
              content: '感谢您的反馈',
            })
            _this.props.onOk()
            _this.setState({
              fileList: [],
            })
          })
          .catch(function (error) {
            Modal.error({
              title: '提交失败',
              content: '请检测您的网络',
            })
          })
        //onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info)
      })

    // this.props.onOk(values);//调用父组件给的onOk方法并传入Form的参数。
  }
  onCancel = () => {
    const form = this.formRef.current
    form.resetFields()
    this.setState({
      fileList:[]
    })
    this.props.form.resetFields() //重置Form表单的内容
    this.props.onCancel() //调用父组件给的方法
  }
  /*
	onFinish = valuse => {
		axios.post(this.state.path, values)
			.then(res){
				Modal.confrim(
							)
			}


	}
	*/

  //返回
  backHandle = (id) => {
    this.setState({
      listVisible: true,
    })
  }
  //前往
  forwardHandle = (e) => {
    this.setState({
      listVisible: false,
      fileList: [], //问题切换时重置上传列表
    })
    //设置表单分类
    this.formRef.current.setFieldsValue({
      category: e.target.type,
    })
  }

  //文件上传后更新state
  handleChange = ({ fileList: oldFileList,event }) => {
    const fileList = oldFileList.map((item) => {
      if (item.status === "error") {
        item.response = {}
      }
      return item
    })
    this.setState({ fileList })
  }
  dataFormat = (values) => {
    let arr = {}
    arr.category = "2"
    arr.userId = userId
    arr.feedback = values.feedback
    arr.contact = values.contact
    arr.fileIdList = []
    values.upload &&
      values.upload.fileList
        .filter((item) => item.status === "done")
        .forEach(function (item, i) {
          arr.fileIdList.push(item.response.data)
        })

    return arr
  }

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    })
  }

  render() {
    const { fileList, previewVisible, previewTitle, previewImage } = this.state
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )

    const antdVersion = Number(version.split('.')[0]) > 4;
    const modalOpt = antdVersion ? { open: this.props.visible} : { visible: this.props.visible};

    return (
      <>
        <Modal
          title="意见反馈"
          onCancel={this.ModalhandleCancel}
          onOk={this.onOk}
          destroyOnClose={true}
          {...modalOpt}
        >
          <div className="feedback-form">
            <Form ref={this.formRef}>
              <h4>
                <span>*</span>
                问题和意见
              </h4>
              <Form.Item name="category" hidden="true">
                <Input value={this.state.problemcategory} />
              </Form.Item>
              <Form.Item
                name="feedback"
                rules={[
                  {
                    required: true,
                    message: '请输入您的问题描述。',
                  },
                ]}
              >
                <TextArea
                  showCount
                  maxLength={200}
                  placeholder="请填写问题描述以便我们提供更好的帮助（至少输入10个字）"
                />
              </Form.Item>
              <h4>
                {"上传图片（选填，提供问题截图）"} <span>{fileList.length}/4</span>
              </h4>
              <Form.Item name="upload">
                <Upload
                  accept={'image/*'}
                  action="/0/api/v1/user/feedback/uploadfile"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={this.handleChange}
                  data={{ userId }}
                  onPreview={this.handlePreview}
                >
                  {fileList.length >= 4 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <h4>联系方式（手机或邮箱）</h4>
              <Form.Item name="contact">
                <Input placeholder="选填，便于我们与您联系" />
              </Form.Item>
            </Form>
          </div>

          <Modal
            width={700}
            open={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="preview" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Modal>
      </>
    )
  }
}

export default Feedback
