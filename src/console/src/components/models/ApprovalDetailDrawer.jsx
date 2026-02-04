import React, {Fragment, useEffect, useMemo, useState} from 'react'
import {Button, Divider, Drawer, Modal, Tag} from "antd"
import "./ApprovalDetailDrawer.less"
import PropTypes from "prop-types"
import auditApi from "../../serviceApi/auditApi"
import {useReactive} from "ahooks"
import {categoryIdList} from "../../pages/ApprovalCenter/pages/ApprovalCenterIndex"
import dayjs from "dayjs"
import { ProcessingWithTTime } from '../../utils/hook/methods'
import {getWaterMarkImageUrl} from "../../utils/getImage"
import warenhouseApi from "../../serviceApi/warenhouseApi"
import {educationalBackgroundList} from "../../pages/AccountPage/components/EducationInfoAuthenticate"

const getUserImage = (img)=>`/0/api/v1/user/image/profile_photo/${img}`
const getCoverUrlImage = (img)=>`/0/api/v1/files/get?fullFileName=${img}`

function renderCategoryText(categoryId) {
  const findResult = (categoryIdList()).find(item=>item.value === String(categoryId))
  return findResult ? findResult.label : ""
}
function renderTimeText(text) {
  return ProcessingWithTTime(text)
}




function renderMajor(value) {
  const result =  educationalBackgroundList.find(item=>item.value===value)
  return result? result.label :""
}

function ApprovalDetailDrawer(props) {


  const handlePreview = (url) => {
    setPreviewImage(url)
    setPreviewOpen(true)
  }
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState("")


  const { visible,setVisible,id,isReadOnly,openUpdateModal } = props

  const detailInfo = useReactive({
    categoryId:'',
    content:'',
    createTime:'',
    opinion:'',
    status:'',
    updateTime:'',
    username:'',
    contentObj:{}
  })

  useEffect(() => {
    if(id && visible){
      auditApi.getAuditDetail(id).then((res)=>{
        const { auditInfo } = res.data
        detailInfo.categoryId = auditInfo.categoryId
        detailInfo.content = auditInfo.content
        detailInfo.createTime = auditInfo.createTime
        detailInfo.opinion = auditInfo.opinion
        detailInfo.status = auditInfo.status
        detailInfo.updateTime = auditInfo.updateTime
        detailInfo.username = auditInfo.username
        detailInfo.contentObj = JSON.parse(auditInfo.content)

        if(detailInfo.contentObj.packageId){
          const { packageId,projectId } = detailInfo.contentObj
          warenhouseApi.getDetail({
            packageId
          }).then((res)=>{
            detailInfo.contentObj = {
              packageId,
              projectId,
              ...res.data
            }
          })
        }

      })
    }

  }, [id,visible])



  const onClose = ()=>{
    setVisible(false)
    detailInfo.categoryId = ''
    detailInfo.content = ''
    detailInfo.createTime = ''
    detailInfo.opinion = ''
    detailInfo.status = ''
    detailInfo.updateTime = ''
    detailInfo.username = ''
    detailInfo.contentObj = {}
  }

  const title = (
    <div>
      申请单ID:{id}
    </div>
  )


  const footer = useMemo(()=>{
    if(!isReadOnly&& detailInfo.status ==='Auditing'){
      return (
        <Fragment>
          <Button onClick={()=>{
            openUpdateModal(id,'Deny',detailInfo.categoryId)
          }} type={'primary'} danger ghost style={{marginRight:10}}>驳回</Button>
          <Button onClick={()=>{
            openUpdateModal(id,'Pass',detailInfo.categoryId)
          }} type={'primary'} ghost>通过</Button>
        </Fragment>
      )
    }
    return null

  },[detailInfo.status,isReadOnly])

  const StatusTag = useMemo(() => {
    switch (detailInfo.status) {
      case "Pass":
        return  <Tag color="success">通过</Tag>
      case "Auditing":
        return  <Tag color="processing">待审批</Tag>
      case "Deny":
        return  <Tag color="error">未通过</Tag>
      case "Withdraw":
        return  <Tag color="default">撤销申请</Tag>
    }
    return <div></div>

  }, [detailInfo.status])

  const renderContent = useMemo(() => {
    if(JSON.stringify(detailInfo.contentObj) ==="{}"){
      return  null
    }
    if(detailInfo.contentObj.realName){
      return    <Fragment>
        <div className={'item'}>
          <span className={'item-title'}>真实姓名: </span>
          <span>
            {detailInfo.contentObj.realName}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>身份证号: </span>
          <span>
            {detailInfo.contentObj.identityNumber}
          </span>
        </div>

        <div className={'item image-item'}>
          <span className={'item-title'}>证明材料:  </span>

          <div className={'image-container'}>
            {
              detailInfo.contentObj.idCardPhoto && Array.isArray(detailInfo.contentObj.idCardPhoto) &&  detailInfo.contentObj.idCardPhoto.map(item=>{
                return <div>
                  <img
                    key={item}
                    onClick={()=>{
                      handlePreview(getWaterMarkImageUrl(item))
                    }}
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
          </div>

        </div>
      </Fragment>
    }


    if(detailInfo.contentObj.company){
      return    <Fragment>
        <div className={'item'}>
          <span className={'item-title'}>工作单位: </span>
          <span>
            {detailInfo.contentObj.company}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;门:</span>
          <span>
            {detailInfo.contentObj.department}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位:</span>
          <span>
            {detailInfo.contentObj.title}
          </span>
        </div>

        <div className={'item image-item'}>
          <span className={'item-title'}>证明材料:  </span>

          <div className={'image-container'}>
            {
              detailInfo.contentObj.workPhoto && Array.isArray(detailInfo.contentObj.workPhoto) &&  detailInfo.contentObj.workPhoto.map(item=>{
                return <div>
                  <img
                    key={item}
                    onClick={()=>{
                      handlePreview(getWaterMarkImageUrl(item))
                    }}
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
          </div>

        </div>
      </Fragment>
    }


    if(detailInfo.contentObj.school){
      return    <Fragment>
        <div className={'item'}>
          <span className={'item-title'}>学校名称: </span>
          <span>
            {detailInfo.contentObj.school}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>院&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系: </span>
          <span>
            {detailInfo.contentObj.faculty}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历: </span>
          <span>
            {
              renderMajor(detailInfo.contentObj.major)
            }
          </span>
        </div>

        <div className={'item image-item'}>
          <span className={'item-title'}>证明材料: </span>

          <div className={'image-container'}>
            {
              detailInfo.contentObj.educationPhoto && Array.isArray(detailInfo.contentObj.educationPhoto) &&  detailInfo.contentObj.educationPhoto.map(item=>{
                return <div>
                  <img
                    key={item}
                    onClick={()=>{
                      handlePreview(getWaterMarkImageUrl(item))
                    }}
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
          </div>

        </div>
      </Fragment>
    }

    if(detailInfo.contentObj.packageId){
      return  <Fragment>
        <div className={'item'}>
          <span className={'item-title'}>模型ID: </span>
          <span>
            {detailInfo.contentObj.id}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>模型名称: </span>
          <span>
            {detailInfo.contentObj.modelName}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>标签: </span>
          <span>
            { Array.isArray(detailInfo.contentObj.label) && detailInfo.contentObj.label.map(item=><span>{item}</span>)}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>模型分类: </span>
          <span>
            {detailInfo.contentObj.cateName}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>创建人: </span>
          <span>
            {detailInfo.contentObj.creator}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>创建时间: </span>
          <span>
            {renderTimeText(detailInfo.contentObj.createTime)}
          </span>
        </div>


        <div className={'item'}>
          <span className={'item-title'}>更新时间: </span>
          <span>
            {renderTimeText(detailInfo.contentObj.updateTime)}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>简介: </span>
          <span>
            {detailInfo.contentObj.intro}
          </span>
        </div>


        <div className={'item'}>
          <span className={'item-title'}>适用场景: </span>
          <span>
            {detailInfo.contentObj.applicationScene}
          </span>
        </div>

        <div className={'item'}>
          <span className={'item-title'}>落地案例: </span>
          <span>
            {detailInfo.contentObj.realCase}
          </span>
        </div>

        <div className={'item image-item'}>
          <span className={'item-title'}>封面图片: </span>

          <div className={'image-container'}>
            {
              detailInfo.contentObj.coverUrl && (
                <div>
                  <img
                    onClick={()=>{
                      handlePreview(getCoverUrlImage(detailInfo.contentObj.coverUrl))
                    }}
                    style={{
                      width: "100%",
                      marginBottom:10
                    }}
                    src={getCoverUrlImage(detailInfo.contentObj.coverUrl)}
                  />
                </div>
              )
            }
          </div>

        </div>


      </Fragment>
    }


  }, [detailInfo.contentObj])


  const goModelDetail = ()=>{
    const { projectId,packageId } = detailInfo.contentObj

    if(projectId&&packageId){
      const path = `/studio/modelwarenhouse/modelDetail?projectId=${projectId}&editable=true&packageId=${packageId}`
      const origin = window.location.origin
      const realUrl = origin + path
      window.open(realUrl)
    }
  }

  return (
      <Drawer
        className={'approval-detail-drawer'}
        size={'large'}
        title={title}
        placement="right"
        onClose={onClose}
        visible={visible}
        footer={footer}
        footerStyle={{
          textAlign:"right"
        }}
      >
        <div className={'real-title'}>
          <h2 className={'h2-font'} style={{fontSize:20,display:'inline-block',marginRight:10}}>
            {
              renderCategoryText(detailInfo.categoryId)
            }
          </h2>
          {StatusTag}

          {
            detailInfo.categoryId ===2 && <span onClick={goModelDetail}>模型详情</span>
          }

          <div className={'person-info'}>
            <span>申请人 :</span>
            <span style={{margin:"0 10px"}}>
              {
                detailInfo.username
              }
            </span>

            <Divider type="vertical" />
            <span>申请时间 :</span>
            <span style={{margin:"0 10px"}}>
              {renderTimeText(detailInfo.createTime)}
            </span>
          </div>
          <Divider  />
        </div>


        <div className={'content-info'}>
          {renderContent}
        </div>

        <Modal
          visible={previewOpen}
          title={'预览'}
          footer={null}
          onCancel={()=>{
            setPreviewOpen(false)
          }}
        >
          <img
            alt={""}
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>



      </Drawer>
  )
}

ApprovalDetailDrawer.propTypes = {
  visible:PropTypes.bool.isRequired,
  setVisible:PropTypes.func.isRequired,
  id:PropTypes.number.isRequired,
  isReadOnly:PropTypes.bool.isRequired,
  openUpdateModal:PropTypes.func,
}


export default ApprovalDetailDrawer
