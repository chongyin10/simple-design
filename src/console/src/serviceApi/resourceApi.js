import { shopApiPath } from "../services/httpClient"
import { teamId, region, userId } from "../utils/cookie"
import request from "../services/request"

export const resourceUsageCurrent = () => {
  return request.get(`${shopApiPath}/resource_usage/current`, {
    params: {
      team_id: teamId,
    },
  })
}

export const resourceUsageHistory = ({start, end, step}) => {
  return request.get(`${shopApiPath}/resource_usage/history`, {
    params: {
      team_id: teamId,
      start,
      end,
      step,
    },
  })
}

export const serviceList = ({
  pageIndex,
  pageSize,
  chargeType,
  payStatus,
  orderType
}) => {
  return request.post(`${shopApiPath}/service/list`, {
    teamId,
    pageIndex:pageIndex-1,
    pageSize,
    chargeType,
    payStatus,
    orderType
  })
}

export const unsubscribeService = ({
  serviceId
})=>{
  return request.post(`${shopApiPath}/service/unsubscribe`,{
    serviceId
  })
}

export const add = ({ products, type }) => {
  return request.post(`${shopApiPath}/service/add`, {
    products,
    teamId: 'executor',
    userId,
    type,
    region,
    podType: 'kernel'
  })
}

export const resourceInfo = () => {
  return request.get(`${shopApiPath}/resource/info`)
}

export const resourceExpand = ({ podLimitMemory, podLimitCpu, podLimitGpu, podMaxWorkers, operator }) => {
  return request.post(`${shopApiPath}/resource/expand`, {
    podLimitMemory,
    podLimitCpu,
    podLimitGpu,
    podMaxWorkers,
    operator,
    teamId,
    region,
  })
}
