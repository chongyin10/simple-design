import React, {useMemo, useRef, useState} from 'react'
import PropTypes from "prop-types"
import {Button, Form, Input, message, Modal, Select, Tag, Upload} from "antd"
import {useMemoizedFn, useReactive} from "ahooks"
import {useForm} from "antd/es/form/Form"
import {renderInfoText} from "../pages/PersonalInformation"
import FileApi from "../../../serviceApi/fileApi"
import {getBase64} from "./WorkInfoAuthenticate"
import userApproveApi from "../../../serviceApi/userApproveApi"
import {getWaterMarkImageUrl} from "../../../utils/getImage"


const MAX_COUNT = 1

const { Option } = Select



//


// 博士后
// 博士
// MBA
// 硕士
// 本科
// 大专
// 中专
// 高中
// 初中

export const educationalBackgroundList = [
  {value:"Post Doctorate",label:"博士后"},
  {value:"ph.D",label:"博士"},
  {value:"MBA",label:"MBA"},
  {value:"MA",label:"硕士"},
  {value:"BA",label:"本科"},
  {value:"junior college",label:"大专"},
  {value:"technical secondary school",label:"中专"},
  {value:"intermediate technical certificate",label: "中技"},
  {value:"senior high school",label:"高中"},
  {value:"junior high school",label:"初中"},
]

function findEducationBackground(value) {
  const result = educationalBackgroundList.find(item=>item.value === value)
  return result? result.label : ""
}


function EducationInfoAuthenticate(props) {

  const { educationInfo } = props

  const state = useReactive({
    // show | form
    mode: "show",
  })
  const [form] = useForm()
  const educationPhotoRef = useRef()
  const gotoAuthenticate = () => {
    state.mode = "form"
  }

  const cancel = () => {
    form.resetFields()
    state.mode = 'show'
  }
  const ok = () => {
    form.validateFields().then((res) => {
      const {
        school,
        faculty,
        major,
      } = res
      const auditId = educationInfo.audit.id
      const { current:educationPhoto } = educationPhotoRef

      userApproveApi.userInformationEducation({
        school,
        faculty,
        major,
        auditId,
        educationPhoto
      }).then(()=>{
        message.success('提交成功')
        state.mode = 'show'
        props.getUserInformationLoad()
      })

    })
  }


  const [materialVisible, setMaterialVisible] = useState(false)

  // 查看证明材料
  const viewMaterial = useMemoizedFn(()=>{
    if(Array.isArray(educationInfo.educationPhoto) && educationInfo.educationPhoto.length!==0){
      setMaterialVisible(true)
      return
    }
    message.warning('当前无证明材料可看')
  })


  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")


  const handleCancel = useMemoizedFn(()=>{
    setPreviewOpen(false)
  })
  const onRemove = useMemoizedFn((file)=>{
    setFileList(fileList=>fileList.filter(item=>item.uid!==file.uid))
    educationPhotoRef.current = []
  })

  const customRequest = useMemoizedFn(({file}) => {
    FileApi.uploadFiles({
      file,
      path: "user_audit"
    }).then((res) => {
      file.url = getWaterMarkImageUrl(res.data[0])
      setFileList([file])
      educationPhotoRef.current = res.data
    })

  })
  const beforeUpload = useMemoizedFn((file) => {
    const {type, size} = file

    if(fileList.length>=MAX_COUNT){

      message.warning('上传图片数量超过限制')
      return Upload.LIST_IGNORE
    }

    if (!type.includes("image")) {
      message.warning('上传的类型必须是图片')
      return Upload.LIST_IGNORE
    }
    if (size > 2 * 1024 * 1024) {
      message.warning('上传的文件不超过2M')
      return Upload.LIST_IGNORE
    }

    return true
  })


  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file)
    }
    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    )
  }

  const renderBtn = useMemo(() => {

    if (!educationInfo.audit.status) {
      return (
        <Button onClick={gotoAuthenticate} type={"primary"}>
          去认证
        </Button>
      )
    }

    return (
      <div>
        <Button type={'link'} onClick={viewMaterial}>查看证明材料</Button>
        {
          educationInfo.audit.status === 'auditing' && <Tag  style={{fontSize:14,padding:"3px 7px",marginRight:0}} color="processing">验证中</Tag>
        }
        {
          educationInfo.audit.status === 'withdraw' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}}  color="default">撤回</Tag>
        }
        {
          educationInfo.audit.status === 'deny' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}}  color="error">认证未通过</Tag>
        }
        {
          educationInfo.audit.status === 'pass' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}}  color="success">认证完成</Tag>
        }
        {
          educationInfo.audit.status !== 'pass' &&
          <Button type={'primary'} onClick={gotoAuthenticate} style={{marginLeft: 15}}>重新认证</Button>
        }

      </div>
    )

  }, [educationInfo.audit.status])


  return (
    <div className={'education-info'}>
      <div className={'title'}>
        <h2 className={'h2-font'}>教育信息</h2>
        {state.mode === "show" ? (
          renderBtn
        ) : (
          <div>
            <Button onClick={cancel} style={{marginRight: "20px"}}>
              取消
            </Button>
            <Button onClick={ok} type={"primary"}>
              确定
            </Button>
          </div>
        )}

      </div>

      <ul className={'info-content'}  style={{ display: state.mode === "show" ? "block" : "none" }}>
        <li className={'info-item'}>
          <span className={'info-title'}>学校名称</span>
          <span className={'info-content'}>{renderInfoText(educationInfo.school)}</span>
        </li>
        <li className={'info-item'}>
          <span className={'info-title'}>院系</span>
          <span className={'info-content'}>{renderInfoText(educationInfo.faculty)}</span>
        </li>
        <li className={'info-item'}>
          <span className={'info-title'}>学历</span>
          <span className={'info-content'}>{renderInfoText( findEducationBackground(educationInfo.major))}</span>
        </li>
      </ul>

      <div
        className={"form-container"}
        style={{ display: state.mode === "form" ? "flex" : "none" }}
      >
        <div className={"left"}>
          <Form
            labelCol={{
              span:5
            }}
            form={form}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "学校名称是必填的",
                },
              ]}
              name={"school"}
              label="学校名称"
            >
              <Input placeholder={'示例: 清华大学'}  style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message:"院系是必填的"
                },
              ]}
              name={"faculty"}
              label="院 系"
            >
              <Input placeholder={'示例: 计算机科学与技术系'} style={{ width: 300 }} />
            </Form.Item>


            <Form.Item
              rules={[
                {
                  required: true,
                  message:"学历是必选的"
                },
              ]}
              name={"major"}
              label="学 历"
            >
              <Select placeholder={'请选择'} allowClear>
                {
                  educationalBackgroundList.map(item=>
                    <Option key={item.value} value={item.value}>{item.label}</Option>)
                }
              </Select>
            </Form.Item>

          </Form>
        </div>

        <div className={"right"}>
          <Upload.Dragger
            accept="image/*"
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            fileList={fileList}
            onPreview={handlePreview}
            onRemove={onRemove}
            maxCount={MAX_COUNT}
          >
            <p className="ant-upload-text">请将证明材料拖拽到此处或 <span style={{color: '#1890ff'}}>点击上传</span></p>
            <p onClick={(event) => {
              event.stopPropagation()
            }} className="ant-upload-hint">
              请提供可证明你教育信息的证明
            </p>

          </Upload.Dragger>
        </div>
      </div>


      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt={""}
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>


      <Modal
        visible={materialVisible}
        title={'证明材料'}
        footer={null}
        onCancel={()=>{
          setMaterialVisible(false)
        }}
      >
        {
          educationInfo.educationPhoto && Array.isArray(educationInfo.educationPhoto) &&  educationInfo.educationPhoto.map(item=>{
            return <div>
              <img
                alt={""}
                style={{
                  width: "100%",
                  marginBottom:10
                }}
                src={getWaterMarkImageUrl(item)}
              />
            </div>
          })
        }
      </Modal>



    </div>
  )
}

EducationInfoAuthenticate.propTypes = {
  educationInfo:PropTypes.object.isRequired,
  getUserInformationLoad:PropTypes.func.isRequired,
}

export default EducationInfoAuthenticate
