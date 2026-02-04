import { shopApiPath } from "../../services/httpClient"
import request from "../../services/request"

const getResourceList = ({ type }) => {
  // type 分为calculate/storage
  return request.get(`${shopApiPath}/resource-meal/list`, {
    params: {
      type,
    },
  })
}

const calculatePrice = ({ storageId, computeId, duration, payModel }) => {
  const data = {
    storageId,
    computeId,
    payModel,
    duration,
  }
  return request.post(
    `${shopApiPath}/resource-meal/bind-calculate-price`,
    data
  )
}

const resourceApi = {
  getResourceList,
  calculatePrice,
}
export default resourceApi
