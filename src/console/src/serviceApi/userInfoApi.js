import { manageApiPath, adminRsPath } from "../services/httpClient"
import {userId} from "../utils/cookie"
import request from "../services/request"


const getUserInfo = () => {
  return request.get(`${manageApiPath}/user/getUserInfo`, { params: { userId, handTryCatch: true} })
}

const logout = async () => {
  return await request.get(`${manageApiPath}/user/logout`)
}

const updateUsername = ({ username }) => {
  return request.post(`${manageApiPath}/user/mail/update-username`, { username, userId })
}
const uploadAvatar = (file) => {
  const formData = new FormData()
  formData.append("userId", userId)
  formData.append("file", file)
  return request.post(`${manageApiPath}/user/upload-profile-photo`, formData)
}

const getInviteCode = (data) => {
  return request.post(`${manageApiPath}/admin/vefify/send-vefify-code`, data)
}

const verifyInviteCode = (data) => {
  return request.post(`${manageApiPath}/admin/vefify/check-vefify-code`, data)
}

// 注销账户
const cancellationUser = () => {
  const url = `${adminRsPath}/user-information/delete-user`
  return request.post(url)
}

const userInfoApi = {
  getUserInfo,
  updateUsername,
  uploadAvatar,
  getInviteCode,
  verifyInviteCode,
  cancellationUser,
  logout
}

export default userInfoApi
