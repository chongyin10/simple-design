import { manageApiPath, merchandiseApiPath } from './httpClient'
import request from "./request"

function getArea() {
    const url = `${manageApiPath}/gm/area/list`
    return request.get(url)
}

function getInventoryType(type, areaId) {
    const url = `${merchandiseApiPath}/inventory/getInventoryType/${type}/${areaId}`
    return request.get(url)
}

function getLableList(type) {
    const url = `${merchandiseApiPath}/productLabel/getLableList/${type}`
    return request.post(url)
}

function getPageList(params) {
    const url = `${merchandiseApiPath}/userProduct/pageList`
    return request.post(url, { ...params })
}

function calculatePrice(params) {
    const url = `${merchandiseApiPath}/userProduct/calculatePrice`
    return request.post(url, { ...params })
}

const merchandiseApi = {
    getArea,
    getInventoryType,
    getPageList,
    getLableList,
    calculatePrice
}

export default merchandiseApi;
