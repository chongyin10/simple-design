import React, {Fragment, useMemo, useRef, useState} from "react"
import {Button, Form, Input, message, Modal, Tag, Upload} from "antd"
import {useMemoizedFn, useReactive} from "ahooks"
import { useForm } from "antd/es/form/Form"
import { PlusOutlined } from "@ant-design/icons"
import "./NameInfoAuthenticate.less"
import PropTypes from "prop-types"
import {renderInfoText} from "../pages/PersonalInformation"
import FileApi from "../../../serviceApi/fileApi"
import {getWaterMarkImageUrl} from "../../../utils/getImage"
import userApproveApi from "../../../serviceApi/userApproveApi"


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const MAX_COUNT = 2

function NameInfoAuthenticate(props) {

  const { identityInfo } = props

  const state = useReactive({
    // show | form
    mode: "show",
  })
  const [form] = useForm()
  const idCardPhotoRef = useRef([])
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
        realName,
        identityNumber
      } = res
      const auditId = identityInfo.audit.id
      const { current:idCardPhoto } = idCardPhotoRef

      userApproveApi.userInformationIdentity({
        realName,
        identityNumber,
        auditId,
        idCardPhoto
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
    if(Array.isArray(identityInfo.idCardPhoto) && identityInfo.idCardPhoto.length!==0){
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
    const findIndex = fileList.findIndex(item=>item.uid === file.uid)
    fileList.splice(findIndex,1)
    idCardPhotoRef.current.splice(findIndex,1)
    setFileList([...fileList])
  })

  const customRequest = useMemoizedFn(({file}) => {
    FileApi.uploadFiles({
      file,
      path: "user_audit"
    }).then((res) => {
      file.url = getWaterMarkImageUrl(res.data[0])

      setFileList(fileList=>{
        fileList.push(file)
        return [...fileList]
      })
      idCardPhotoRef.current = idCardPhotoRef.current.concat(res.data)
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

    if (!identityInfo.audit.status) {
      return (
        <Button onClick={gotoAuthenticate} type={"primary"}>
          去认证
        </Button>
      )
    }

    return (
      <div>
        <Button type={'link'} onClick={viewMaterial} >查看证明材料</Button>
        {
          identityInfo.audit.status === 'auditing' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}} color="processing">验证中</Tag>
        }
        {
          identityInfo.audit.status === 'withdraw' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}}  color="default">撤回</Tag>
        }
        {
          identityInfo.audit.status === 'deny' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}} color="error">认证未通过</Tag>
        }
        {
          identityInfo.audit.status === 'pass' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}} color="success">认证完成</Tag>
        }
        {
          identityInfo.audit.status !== 'pass' &&
          <Button type={'primary'} onClick={gotoAuthenticate} style={{marginLeft: 15}}>重新认证</Button>
        }

      </div>
    )

  }, [identityInfo.audit.status])


  return (
    <div className={"name-info"}>
      <div className={"title"}>
        <h2 className={"h2-font"}>实名认证</h2>
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

      <ul
        className={"info-content"}
        style={{ display: state.mode === "show" ? "block" : "none" }}
      >
        <li className={"info-item"}>
          <span className={"info-title"}>真实姓名</span>
          <span className={"info-content"}>{renderInfoText(identityInfo.realName)}</span>
        </li>
        <li className={"info-item"}>
          <span className={"info-title"}>身份证号</span>
          <span className={"info-content"}>{renderInfoText(identityInfo.identityNumber)}</span>
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
                  message: "姓名是必填的",
                },
              ]}
              name={"realName"}
              label="真实姓名"
            >
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "身份证号是必填的",
                },
                {
                  pattern:/(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                  message:"请按照正确格式填写身份证号"
                }
              ]}
              name={"identityNumber"}
              label="身份证号"
            >
              <Input style={{ width: 300 }} />
            </Form.Item>
          </Form>
        </div>

        <div className={"right"}>
          <Upload
            accept="image/*"
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onRemove={onRemove}
            maxCount={MAX_COUNT}

          >
            {fileList.length >= 2 ? null : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                ></div>
              </div>
            )}
          </Upload>
          上传身份证正面和反面照片,支持JPG JPEG PNG 且不超过2M
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
          identityInfo.idCardPhoto && Array.isArray(identityInfo.idCardPhoto) &&  identityInfo.idCardPhoto.map(item=>{
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

NameInfoAuthenticate.propTypes = {
  identityInfo:PropTypes.object.isRequired,
  getUserInformationLoad:PropTypes.func.isRequired,
}

export default NameInfoAuthenticate
