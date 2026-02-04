import request from "../services/request"
import {adminRsPath} from "../services/httpClient"
import {userId} from "../utils/cookie"


function userInformationLoad() {
  return request.get(`${adminRsPath}/user-information/load`,{
    params:{
      user_id:userId
    }
  })
}

function userInformationWork({
  company,
  department,
  title,
  workPhoto=[],
  auditId
}) {
  return request.post(`${adminRsPath}/user-information/work`,{
    userId,
    company,
    department,
    title,
    workPhoto,
    auditId:String(auditId)
  })
}

function userInformationEducation({
  school,
  faculty,
  major,
  educationPhoto=[],
  auditId
}) {

  return request.post(`${adminRsPath}/user-information/education`,{
    userId,
    school,
    faculty,
    major,
    educationPhoto,
    auditId:String(auditId)
  })
}
function userInformationIdentity({
  realName,
  identityNumber,
  idCardPhoto = [],
  auditId

}) {
  return request.post(`${adminRsPath}/user-information/identity`,{
    userId,
    realName,
    identityNumber,
    idCardPhoto,
    auditId:String(auditId)
  })

}

function userManagement({pageIndex, pageSize, createTime, conditions}) {
  return request.post(`${adminRsPath}/user-information/management`,{
    pageIndex,
    pageSize,
    createTime,
    conditions
  })
}

const userApproveApi = {
  userInformationLoad,
  userInformationWork,
  userInformationEducation,
  userInformationIdentity,
  userManagement
}

export default userApproveApi
