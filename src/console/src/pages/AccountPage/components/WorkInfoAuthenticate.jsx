import React, {Fragment, useMemo, useRef, useState} from 'react'
import {Button, Form, Input, Modal, Upload, message, Tag} from "antd"
import PropTypes from "prop-types"
import {useMemoizedFn, useReactive} from "ahooks"
import {useForm} from "antd/es/form/Form"
import "./WorkInfoAuthenticate.less"
import {renderInfoText} from "../pages/PersonalInformation"
import userApproveApi from "../../../serviceApi/userApproveApi"
import FileApi from "../../../serviceApi/fileApi"
import {getWaterMarkImageUrl} from "../../../utils/getImage"


const MAX_COUNT = 1

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)

    reader.onerror = (error) => reject(error)
  })


function WorkInfoAuthenticate(props) {

  const {workInfo} = props

  const state = useReactive({
    // show | form
    mode: "show",
  })
  const [form] = useForm()
  const workPhotoRef = useRef()
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
        department,
        company,
        title
      } = res
      const { current:workPhoto } = workPhotoRef

      userApproveApi.userInformationWork({
        department,
        company,
        title,
        auditId: workInfo.audit.id,
        workPhoto
      }).then(() => {
        message.success('提交成功')
        state.mode = 'show'
        props.getUserInformationLoad()
      })

    })
  }

  const [materialVisible, setMaterialVisible] = useState(false)

  // 查看证明材料
  const viewMaterial = useMemoizedFn(()=>{
    if(Array.isArray(workInfo.workPhoto) && workInfo.workPhoto.length!==0){
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
    workPhotoRef.current = []
  })

  const customRequest = useMemoizedFn(({file}) => {
    FileApi.uploadFiles({
      file,
      path: "user_audit"
    }).then((res) => {
      file.url = getWaterMarkImageUrl(res.data[0])
      setFileList([file])
      workPhotoRef.current = res.data
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

    if (!workInfo.audit.status) {
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
          workInfo.audit.status === 'auditing' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}}  color="processing">验证中</Tag>
        }
        {
          workInfo.audit.status === 'withdraw' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}}  color="default">撤回</Tag>
        }
        {
          workInfo.audit.status === 'deny' && <Tag style={{fontSize:14,padding:"3px 7px",marginRight:0}}  color="error">认证未通过</Tag>
        }
        {
          workInfo.audit.status === 'pass' && <Tag  style={{fontSize:14,padding:"3px 7px",marginRight:0}} color="success">认证完成</Tag>
        }
        {
          workInfo.audit.status !== 'pass' &&
          <Button type={'primary'} onClick={gotoAuthenticate} style={{marginLeft: 15}}>重新认证</Button>
        }

      </div>
    )

  }, [workInfo.audit.status])

  return (
    <div className={'work-info'}>
      <div className={'title'}>
        <h2 className={'h2-font'}>工作信息</h2>
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
        className={'info-content'}
        style={{display: state.mode === "show" ? "block" : "none"}}
      >
        <li className={'info-item'}>
          <span className={'info-title'}>工作单位</span>
          <span className={'info-content'}>{renderInfoText(workInfo.company)}</span>
        </li>
        <li className={'info-item'}>
          <span className={'info-title'}>部门</span>
          <span className={'info-content'}>{renderInfoText(workInfo.department)}</span>
        </li>
        <li className={'info-item'}>
          <span className={'info-title'}>职位</span>
          <span className={'info-content'}>{renderInfoText(workInfo.title)}</span>
        </li>
      </ul>

      <div
        className={"form-container"}
        style={{display: state.mode === "form" ? "flex" : "none"}}
      >
        <div className={"left"}>
          <Form
            labelCol={{
              span: 5
            }}
            form={form}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "工作单位是必填的",
                },
              ]}
              name={"company"}
              label="工作单位"
            >
              <Input placeholder={'示例: 北京白海科技有限公司'} style={{width: 300}}/>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "部门是必填的"
                },
              ]}
              name={"department"}
              label="部 门"
            >
              <Input placeholder={'示例: 产研中心'} style={{width: 300}}/>
            </Form.Item>


            <Form.Item
              rules={[
                {
                  required: true,
                  message: "职位是必填的"
                },
              ]}
              name={"title"}
              label="职 位"
            >
              <Input placeholder={'示例: 高级算法工程师'} style={{width: 300}}/>
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
              请提供可证明你工作信息的证明
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
          workInfo.workPhoto && Array.isArray(workInfo.workPhoto) &&  workInfo.workPhoto.map(item=>{
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

WorkInfoAuthenticate.propTypes = {
  workInfo: PropTypes.object.isRequired,
  getUserInformationLoad: PropTypes.func.isRequired,
}

export default WorkInfoAuthenticate
