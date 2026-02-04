import { shopApiPath } from "../services/httpClient"
import request from "../services/request"

const getProductList = ({ pageIndex = 1, pageSize = 10 }) => {
  return request.post(`${shopApiPath}/product/list`, {
    pageIndex: pageIndex - 1,
    pageSize: pageSize,
    class: "standard"
  })
}

const productPrice = (products) => {
  return request.post(`${shopApiPath}/product/price`, {
    products,
  })
}

const getProductDiscountList = ()=>{
  return request.get(`${shopApiPath}/product/discount`)
}

const productApi = {
  getProductList,
  productPrice,
  getProductDiscountList
}

export default productApi
