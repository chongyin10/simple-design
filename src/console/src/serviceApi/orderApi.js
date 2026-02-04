import { shopApiPath } from "../services/httpClient"
import { getTeamId, region, userId } from "../utils/cookie"
import request from "../services/request"

const generateOrder = (products, type) => {
  return request.post(`${shopApiPath}/order/create`, {
    products,
    teamId: getTeamId(),
    userId,
    type,
    region,
  })
}

const getOrderList = () => {
  return request.post(`${shopApiPath}/order/list`, {
    teamId: getTeamId(),
    // teamId: "500",
  })
}

const orderPayInfo = ({ orderId }) => {
  return request.post(`${shopApiPath}/order/detail`, {
    orderId,
    teamId: getTeamId(),
  })
}

const confirmPayment = ({ orderId, verifyCode, account }) => {
  const data = {
    orderId,
    verifyCode,
    account,
    teamId: getTeamId(),
  }
  return request.post(`${shopApiPath}/order/pay`, data)
}

const orderPrice = ({
  duration,
  bhuPrice,
  instancePrice,
  rebate,
  chargeType,
  count,
}) => {
  return request.get(`${shopApiPath}/order/price`, {
    params: {
      duration,
      bhuPrice,
      instancePrice,
      rebate,
      chargeType,
      count,
    },
  })
}

const createOrder = ({
  packageId,
  cloud,
  teamId,
  chargeType,
  cpu,
  gpu,
  memory,
  dataDiskSize,
  count,
  bhuPrice,
  instancePrice,
  rebate,
  duratio,
  autoRenew
})=>{
  const url = `/1/api/v1/command/cloud/norm`

  return request.post(url,{
    packageId,
    cloud,
    teamId,
    chargeType,
    cpu,
    gpu,
    memory,
    dataDiskSize,
    count,
    bhuPrice,
    instancePrice,
    rebate,
    duratio,
    autoRenew
  })
}

const orderPay = (orderId)=>{
  return request.post(`${shopApiPath}/order/pay`,{
    orderId
  })
}

const getDetail = (orderId)=>{
  return request.post(`${shopApiPath}/order/detail`,{
    orderId,
    teamId:getTeamId()
  })
}

const orderApi = {
  getOrderList,
  generateOrder,
  orderPayInfo,
  confirmPayment,
  orderPrice,
  createOrder,
  orderPay,
  getDetail
}

export default orderApi
