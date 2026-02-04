import axios from "axios"
import qs from "querystring"
import { message as messageShow } from "antd"
import { logout } from "../utils"
import {
  submitErrInfo,
  expiredCode,
  httpExpiredCode,
  decideCodeSuccessOrFail,
} from "./httpClient"
import ExtraRequestConfig, { needRequestErrMsg } from "./extraRequestConfig"
import extraRequestConfig from "./extraRequestConfig"
import { getTeamId, userId } from "../utils/cookie"
import { safeJson } from '../utils/utils';
import UrlCatch from '../mobx/catch';
import { toJS } from "mobx"

const JSONBig = require("json-bigint")


const notNeedErrorMessageBoxArr = [
  "/runtime/resource_usage"
]

const request = axios.create({
  baseURL: "",
})

export const requestWithBigIntResponse = axios.create({
  baseURL: "",
  transformResponse: (data) => {
    try {
      return JSONBig.parse(data || {})
    } catch (err) {
      try {
        return safeJson(data);
      } catch (err) {
        return data
      }
    }
  },
})

function judgeWarningOrError(code) {
  let messageType = "error"
  if (code > 30000000 && code < 50000000) {
    messageType = "warning"
  }
  return messageType
}

function showMessageError({ code, msg, data, url}) {
  const messageType = judgeWarningOrError(code);
  const handCatch = filterInterceptorsResponse(url);
  const msgTitle = filterInterceptorsResponseMsgTitle();
  if ( !handCatch ) {
    if (messageType === "error") {
      messageShow.error(
        `${process.env.NODE_ENV === "development" ? "后端接口" + code + "异常" : ""
        } ${msg ? "message:" + msg : ""}`,
        1.5
      )
    } else {
      messageShow.warning(
        `${process.env.NODE_ENV === "development" ? "后端接口" + code + "异常" : ""
        } ${msg ? "message:" + msg : ""}`,
        1.5
      )
    }
  } else {
    msgTitle && messageShow.info(msgTitle);
    UrlCatch.setMsgTitle('');
    UrlCatch.removeUrlCatchMap(url);
  }
}

function judgeNeedErrMsg() {
  if (!extraRequestConfig.needErrMsg) {
    needRequestErrMsg()
  }
}

export const handleCode = ({ code, message: msg, url, data }) => {
  switch (code) {
    case expiredCode:
      showMessageError({ code, msg, data, url})
      setTimeout(() => {
        logout()
      }, 2000)
      break
    case httpExpiredCode:
      showMessageError({ code, msg, data, url})
      setTimeout(() => {
        logout()
      }, 2000)
      break
    default:
      {
        if (ExtraRequestConfig.needErrMsg) {
          showMessageError({ code, msg, data, url})
        }
      }
      break
  }
  if (url) {
    submitErrInfo(url, msg)
  }
  judgeNeedErrMsg()
}

function interceptorsRequestUseResolve(config) {
  const { data, params } = config;
  //这里会过滤所有为空、0、false的key，如果不需要请自行注释
  /*if (config.data) {
    config.data = lodash.pickBy(config.data, lodash.identity)
  }*/
  if (
    config.data &&
    config.headers["Content-Type"] ===
    "application/x-www-form-urlencoded;charset=UTF-8"
  ) {
    config.data = qs.stringify(config.data)
  }
  const url = config.url.split('?')[0]
  const qsStr = config.url.split('?')[1]

  // config.params 结合了params属性以及原本就在url上的内容
  config.params = {
    ...config.params,
    ...qs.parse(qsStr)
  }
  config.url = url
  if (!config.params.userId) {
    config.params.userId = userId
  }
  if (!config.params.teamId) {
    config.params.teamId = getTeamId()
  }
  const newConfig = filterInterceptorsRequest(config, data, params);
  return newConfig
}

function filterInterceptorsRequest(config, data, params) {
  if ( data?.hasOwnProperty('handTryCatch') || params?.hasOwnProperty('handTryCatch') ) {
    config?.data?.hasOwnProperty('handTryCatch') && delete config?.data.handTryCatch;
    config?.params?.hasOwnProperty('handTryCatch') && delete config?.params.handTryCatch;
    UrlCatch.pushUrlCatchMap(config.url);
  }
  if (data?.hasOwnProperty('msgTitle') || params?.hasOwnProperty('msgTitle')) {
    let msgTitleGlobal = '';
    if ( config?.data?.hasOwnProperty('msgTitle') ) {
      msgTitleGlobal = config?.data.msgTitle;
      delete config?.data.msgTitle;
    };
    if ( config?.params?.hasOwnProperty('msgTitle') ) {
      msgTitleGlobal = config?.params.msgTitle;
      delete config?.params.msgTitle;
    }
    UrlCatch.setMsgTitle(msgTitleGlobal);
  }
  return config
}

function filterInterceptorsResponseMsgTitle() {
  return toJS(UrlCatch.getMsgTitle());
}

function interceptorsRequestUseReject(error) {
  return Promise.reject(error)
}

function filterInterceptorsResponse(url) {
  const urlmap = toJS(UrlCatch.getUrlCatchMap());
  return urlmap?.some( it => it == url);
}

function interceptorsResponseResolve(response) {
  const { data, config } = response;
  const requestUrl = config.url
  let { code, msg, message, data: realData } = data
  interceptAuthJwtResponseReject(response);

  if (requestUrl.includes("/api/v2/idp-note-rs/content/cat")) {
    const qsParam = requestUrl.split("?")[1]
    const { path } = qs.parse(qsParam)
    if (code === 51001002) {
      message = path + " " + message
    }
  }
  // 是否操作正常
  if (decideCodeSuccessOrFail(code)) {
    judgeNeedErrMsg()
    return data
  } else {
    if(notNeedErrorMessageBoxArr.find(item=>requestUrl.includes(item))){
      return Promise.reject({
        message: message || msg || "Error",
        code,
        data: realData,
        url: requestUrl,
      })
    }

    handleCode({
      code,
      message: msg || message,
      url: requestUrl,
      data: realData,
    })
    return Promise.reject({
      message: message || msg || "Error",
      code,
      data: realData,
      url: requestUrl,
    })
  }
}

/**
 * jwt认证拦截器
 * @param {*} res 
 */
 function interceptAuthJwtResponseReject(res) {
  const { status, data } = res;
  // 处理id_token有问题的情况，避免页面出错
  if ( data.code == '401' && data.data == 'Jwt verification fails' ) {
    // messageShow.info(`您的登录信息已过期，系统自动将跳转到登录页`)
    logout();
    return Promise.reject();
  } 
  if (status == '403' && data == 'RBAC: access denied') {  
    return Promise.reject(new Error('您访问的资源受限'));
  }
}

function interceptorsResponseReject(error) {
  const requestUrl = error.response.config.url;
  const dataMessage = typeof error.response.data ==='object' ? error.response.data.message :null
  let { response, message } = error
  message = dataMessage || message
  if (response.status === httpExpiredCode) {
    const { status } = response
    handleCode({
      code: status,
      url: requestUrl,
    })
    return Promise.reject({ message })
  }

  if(notNeedErrorMessageBoxArr.find(item=>requestUrl.includes(item))){
    return Promise.reject({
      message,
    })
  }
  if (error.response && error.response.data) {
    const { status, data } = response
    handleCode({
      code: status,
      url: requestUrl,
      message: data.msg || message,
      data,
    })
    return Promise.reject({ message: data.msg || message })
  } else {
    let { message } = error
    if (message === "Network Error") {
      message = "后端接口连接异常"
    }
    if (message.includes("timeout")) {
      message = "后端接口请求超时"
    }
    if (message.includes("Request failed with status code")) {
      const code = message.substr(message.length - 3)
      message = "后端接口" + code + "异常"
    }
    messageShow.error(message || `后端接口未知异常`, 1.5)
    // submitErrInfo(requestUrl, message)
    judgeNeedErrMsg()
    return Promise.reject({ message })
  }
}

request.interceptors.request.use(
  interceptorsRequestUseResolve,
  interceptorsRequestUseReject
)

request.interceptors.response.use(
  interceptorsResponseResolve,
  interceptorsResponseReject
)

requestWithBigIntResponse.interceptors.request.use(
  interceptorsRequestUseResolve,
  interceptorsRequestUseReject
)
requestWithBigIntResponse.interceptors.response.use(
  interceptorsResponseResolve,
  interceptorsResponseReject
)

export default request
