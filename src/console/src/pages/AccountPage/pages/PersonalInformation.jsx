import React, {useContext, useEffect, useState,Fragment} from 'react'
import "./PersonalInformation.less"
import UploadImage from "../../../components/accountSetting/components/UploadImage"
import {AppContext} from "../../App"
import {Divider} from "antd"
import {useSelector} from "react-redux"
import {selectUserEmail, selectUserId, selectUserName, selectUserPhone} from "../../../store/modules/userSlice"
import ModifyUserNameModal from "../../../components/models/modifyUserNameModal"
import NameInfoAuthenticate from "../components/NameInfoAuthenticate"
import WorkInfoAuthenticate from "../components/WorkInfoAuthenticate"
import EducationInfoAuthenticate from "../components/EducationInfoAuthenticate"
import userApproveApi from "../../../serviceApi/userApproveApi"
import {useMemoizedFn, useReactive} from "ahooks"
import {hasModulePermission} from "../../../utils/storage"



export const renderInfoText = (text)=>{
  return text? text : "未填写"
}

export const approveStatusList = [
  {value:"auditing",label:"验证中"},
  {value:"pass",label:"通过"},
  {value:"withdraw",label:"撤回"},
  {value:"deny",label:"拒绝"},
]



function PersonalInformation(props) {

  const {
    avatarUrl,
    updateAvatarUrl
  } = useContext(AppContext)

  const [modifyUserNameVisible, setModifyUserNameVisible] = useState(false)


  let baseInfo = useReactive({
    email:"",
    phone:"",
    userId:"",
    userName:"",
  })
  let educationInfo = useReactive({
    audit: {},
    educationPhoto:'',
    faculty:'',
    major:'',
    school:'',
  })
  let identityInfo = useReactive({
    audit:{},
    idCardPhoto:'',
    identityNumber:'',
    realName:'',
  })
  let workInfo = useReactive({
    audit:{},
    company:'',
    department:'',
    title:'',
    workPhoto:'',
  })

  useEffect(()=>{
    getUserInformationLoad()
  },[])

  const getUserInformationLoad = useMemoizedFn(()=>{
    userApproveApi.userInformationLoad().then((res)=>{
      baseInfo.email = res.data.baseInfo.email
      baseInfo.phone = res.data.baseInfo.phone
      baseInfo.userId = res.data.baseInfo.userId
      baseInfo.userName = res.data.baseInfo.userName

      educationInfo.audit = res.data.educationInfo.audit
      educationInfo.educationPhoto = res.data.educationInfo.educationPhoto
      educationInfo.faculty = res.data.educationInfo.faculty
      educationInfo.major = res.data.educationInfo.major
      educationInfo.school = res.data.educationInfo.school

      identityInfo.audit = res.data.identityInfo.audit
      identityInfo.idCardPhoto = res.data.identityInfo.idCardPhoto
      identityInfo.identityNumber = res.data.identityInfo.identityNumber
      identityInfo.realName = res.data.identityInfo.realName

      workInfo.audit = res.data.workInfo.audit
      workInfo.company = res.data.workInfo.company
      workInfo.department = res.data.workInfo.department
      workInfo.title = res.data.workInfo.title
      workInfo.workPhoto = res.data.workInfo.workPhoto

    })
  })



  // authenticate

  return (
    <div className={"personal-information-container"}>
      <div className={'basic-info'}>
        <h2 className={"h2-font"}>基本信息</h2>
        <div className={'basic-info-content'}>
          <div className={'left'}>
            <div className={'img-container'}>
              <img src={avatarUrl} alt="" />
            </div>
            <UploadImage updateUI={updateAvatarUrl}/>
          </div>
          <div className={'right'}>
            <ul className={'user-info'}>
              <li className={'info-item'}>
                <span className={'title'}>用户昵称</span>
                <span className={'info-content'}>{baseInfo.userName}</span>
                <p
                  className="info-png edit-name"
                  style={{
                    background: `url(${require('@/assets/image/editblack.svg').default}) 0 no-repeat`
                  }}
                  onClick={() => {
                    setModifyUserNameVisible(true)
                  }}
                ></p>
              </li>
              <li className={'info-item'}>
                <span className={'title'}>用户ID</span>
                <span className={'info-content'}>{baseInfo.userId}</span>
              </li>
              <li className={'info-item'}>
                <span className={'title'}>手机号</span>
                <span className={'info-content'}>{baseInfo.phone}</span>
              </li>

              <li className={'info-item'}>
                <span className={'title'}>邮箱</span>
                <span className={'info-content'}>{baseInfo.email}</span>
              </li>

            </ul>

          </div>
        </div>

        {
          hasModulePermission("user_auth")?(
            <div className={'tool-tip-container'}>
              <p>完成实名认证+工作认证，或完成实名认证+教育认证，即可获得以下权益：</p>
              <p>1，在共享中心克隆模型、试用模型、发布模型需求</p>
              <p>2，共享自己的模型</p>
            </div>
          ):null
        }
      </div>
      {
        hasModulePermission("user_auth")?(
          <Fragment>
            <Divider dashed={true} style={{backgroundColor:"#333"}} />

            <NameInfoAuthenticate identityInfo={identityInfo} getUserInformationLoad={getUserInformationLoad}/>
            <WorkInfoAuthenticate workInfo={workInfo} getUserInformationLoad={getUserInformationLoad} />
            <EducationInfoAuthenticate educationInfo={educationInfo} getUserInformationLoad={getUserInformationLoad} />

            <div style={{height:30}}></div>
          </Fragment>
        ):null
      }


      <ModifyUserNameModal callback={(name)=>{
        baseInfo.userName = name
      }} visible={modifyUserNameVisible} setVisible={setModifyUserNameVisible} />
    </div>
  )
}

export default PersonalInformation
