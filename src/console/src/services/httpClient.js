import axios from 'axios';
import { region, teamId, userId } from '../utils/cookie';
import feedbackApi from "../serviceApi/feedbackApi"

export const noteApiPath = `/${teamId}/api/v1/idp-note`;
export const kernelApiPath = `/${region}/api/v1/execute`
export const noteApiPath2 = `/${region}/api/v2/idp-note-rs`;
export const commandApiPath = `/${region}/api/v1/command`;
export const commandApiPath2 = `/${region}/api/v2/command`;
export const resourcePath = `/2/api/v1/idp-product/resource`

export const commandManagerApiPath = '/1/api/v1';
export const manageApiPath = '/0/api/v1';
export const shopApiPath = '/2/api/v1/idp-shop';
export const adminRsPath = "/0/api/v1/admin-rs"
export const modelApiPath = '/0/api/v1/model-api'
//费用管理模块apipath
export const productApiPath = '/2/api/v1/idp-product';
export const enginePath = '/0/api/v1/gm';
export const merchandiseApiPath = '/2/api/v1/idp-product';
export const areaPath = `/0/api/v1/gm/area`;

export const modelServicePath = "/0/api/v1/model-service"
export const volcanoApiPath = '/0/api/v1/idp-volcano-helper';
export const deepspeedApiPath = `/${region}/api/v2/idp-cluster-rs`;
export const gmApiPath = `/0/api/v1/gm`;
export const resourceApiPath = '/0/api/v1/resource';
export const areaApiPath = '/0/api/v1/area';
export const adminApiPath = `/0/api/v1/admin-rs`;



function redirect(url) {
  if (url) {
    window.location.href = url
  }
}

// 自动提交异常信息
export function submitErrInfo(source, error) {
  if (source && source.indexOf('feedback/save') !== -1) return;
  const isJson = typeof (error) === 'object'
    && Object.prototype.toString.call(error).toLowerCase() === '[object object]'
    && !error.length;
  const message = isJson ? JSON.stringify(error) : error.toString()
  const feedback = {
    source,
    message
  }
  const params = {
    category: 1,
    userId: userId,
    feedback: JSON.stringify(feedback),
    fileIdList: []
  }
  feedbackApi.save(params)
    .catch(function (error) {
      console.log(error);
    })
}

export function get(url) {
  return new Promise(function (resolve, reject) {
    axios.get(url)
      .then(function (response) {
        // console.log(response.data);
        if (decideCodeSuccessOrFail(response.data.code)) {
          resolve(response.data.data);
        } else if (response.data.code === expiredCode || response.data.code === httpExpiredCode) {
          redirect(response.data.redirectUrl)
        } else {
          submitErrInfo(url, response.data.message)
          reject((response.data.message));
        }
      })
      .catch(function (error) {
        // console.log(error);
        submitErrInfo(url, error)
        reject(error);
      })
  });
}

export function post(url, data) {
  return new Promise(function (resolve, reject) {
    axios.post(url, data)
      .then(function (response) {
        // console.log(response.data);
        if (decideCodeSuccessOrFail(response.data.code)) {
          resolve(response.data.data);
        } else if (response.data.code === expiredCode || response.data.code === httpExpiredCode) {
          redirect(response.data.redirectUrl)
        } else {
          submitErrInfo(url, response.data.message)
          reject(new Error(response.data.message));
        }
      })
      .catch(function (error) {
        // console.log(error);
        submitErrInfo(url, error)
        reject(error);
      })
  });
}

export function postReturnWithParams(url, data) {
  return new Promise(function (resolve, reject) {
    axios.post(url, data)
      .then(function (response) {
        // console.log(response.data);
        if (decideCodeSuccessOrFail(response.data.code)) {
          resolve({
            params: data,
            data: response.data.data,
          });
        } else if (response.data.code === expiredCode || response.data.code === httpExpiredCode) {
          redirect(response.data.redirectUrl)
        } else {
          submitErrInfo(url, response.data.message)
          reject(new Error(response.data.message));
        }
      })
      .catch(function (error) {
        // console.log(error);
        submitErrInfo(url, error)
        reject(error);
      })
  });
}

export function put(url, data) {
  return new Promise(function (resolve, reject) {
    axios.put(url, data)
      .then(function (response) {
        // console.log(response.data);
        if (decideCodeSuccessOrFail(response.data.code)) {
          resolve(response.data.data);
        } else if (response.data.code === expiredCode || response.data.code === httpExpiredCode) {
          redirect(response.data.redirectUrl)
        } else {
          submitErrInfo(url, response.data.message)
          reject(new Error(response.data.message));
        }
      })
      .catch(function (error) {
        // console.log(error);
        submitErrInfo(url, error)
        reject(error);
      })
  });
}

export function putReturnWithParams(url, data) {
  return new Promise(function (resolve, reject) {
    axios.put(url, data)
      .then(function (response) {
        // console.log(response.data);
        if (decideCodeSuccessOrFail(response.data.code)) {
          resolve({ data: response.data.data, params: data });
        } else if (response.data.code === expiredCode || response.data.code === httpExpiredCode) {
          redirect(response.data.redirectUrl)
        } else {
          submitErrInfo(url, response.data.message)
          reject(new Error(response.data.message));
        }
      })
      .catch(function (error) {
        // console.log(error);
        submitErrInfo(url, error)
        reject(error);
      })
  });
}

export function del(url) {
  return new Promise(function (resolve, reject) {
    axios.delete(url)
      .then(function (response) {
        // console.log(response.data);
        if (decideCodeSuccessOrFail(response.data.code)) {
          resolve(response.data.data);
        } else if (response.data.code === expiredCode || response.data.code === httpExpiredCode) {
          redirect(response.data.redirectUrl)
        } else {
          reject(new Error(response.data.message));
        }
      })
      .catch(function (error) {
        // console.log(error);
        submitErrInfo(url, error)
        reject(error);
      })
  });
}

export const expiredCode = 41110401
export const httpExpiredCode = 401

export function decideCodeSuccessOrFail(code) {
  let status = false
  if (code === 200 || code === 0) {
    status = true
  } else if (code >= 20000000 && code <= 29999999) {
    status = true
  }
  return status
}

