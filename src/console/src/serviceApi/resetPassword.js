import { manageApiPath } from "../services/httpClient"
import request from "../services/request"

const getVerificationCode = (data) => {
  return request.post(`${manageApiPath}/user/mail/send-active-code`, data)
}

const resetPasswordPlase = (data) => {
  return request.post(`${manageApiPath}/user/rollback/reset-secret`, data)
}

const getPhoneVerificationCode = (data) => {
  return request.post(`${manageApiPath}/user/account/send-validate-code`, data)
}
const resetPassword = {
  getVerificationCode,
  resetPasswordPlase,
  getPhoneVerificationCode
}

export default resetPassword;
