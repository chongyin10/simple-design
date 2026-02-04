import request from "../services/request"
import {modelApiPath} from "../services/httpClient"


function getDetail({packageId}){
  const url = `${modelApiPath}/package/get-package-info`
  return request.get(url, {params: {
      packageId
    }})
}


const warenhouseApi = {
  getDetail
}


export default warenhouseApi
