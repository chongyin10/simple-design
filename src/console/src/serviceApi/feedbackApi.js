import {  manageApiPath } from '../services/httpClient'
import { userId } from '../utils/cookie'
import request from "../services/request"


//     "category": "11",
//     "userName": "小王",
//     "feedback":"测试反馈内容6",
//     "fileIdList":["50b2522c-53f0-4104-bd53-a31dad2425ff"],
//     "status":"1"

function save(options) {
  const url = `${manageApiPath}/feedback/save`
  return request.post(url, { ...options, userId })
}

function getFeedbackList({
  current,
  size,
  sort,
  sortField,
  categoryId=2
}){
  const url = "/0/api/v1/admin-rs/feedback/list"
  return request.get(url,{
    params:{
      current,
      size,
      sort,
      sortField,
      categoryId
    }
  })
}

function saveFeedback(options) {
  const url = `${manageApiPath}/user/feedback/save`
  return request.post(url, { ...options, userId, category: 2 })
}

const feedbackApi = {
  save,
  getFeedbackList,
  saveFeedback
}

export default feedbackApi;
