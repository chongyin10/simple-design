import { productApiPath, manageApiPath } from '../services/httpClient'
import { userId } from '../utils/cookie';
import request from "../services/request"
import { teamId } from '../utils/cookie';

function createOrder(params) {
    const url = `${productApiPath}/order/createOrder`
    return request.post(url, { ...params })
}

function getFinanceAccountApi() {
    const url = `${productApiPath}/finance/account`
    return request.post(url, { teamId });
}

function buyProduct(params) {
    const url = `${productApiPath}/order/buyProduct`
    return request.post(url, { ...params });
}

function getChargeStatus(params) {
    const url = `${productApiPath}/recharge/status`
    return request.post(url, { ...params });
}

function swCreateOrder(params) {
    const url = `${productApiPath}/recharge/createOrder`
    return request.post(url, { ...params })
}

function getOpenUrl(params) {
    const url = `${manageApiPath}/user/open/url`
    return request.get(url)
}

const shopCartApi = {
    createOrder,
    getFinanceAccountApi,
    buyProduct,
    getChargeStatus,
    swCreateOrder,
    getOpenUrl
}

export default shopCartApi;