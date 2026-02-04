import { manageApiPath, resourcePath, enginePath } from './../services/httpClient';
import { userId, teamId } from '../utils/cookie';
import request from "../services/request"

async function getUserArea() {
    return await request.get(`${manageApiPath}/user/getUserArea`, {
        params: {
            handTryCatch: true
        }
    });
}

async function checkAuth() {
    const params = {
        userId,
        handTryCatch: true,
        msgTitle: '您的登录信息已过期，系统自动将跳转到登录页'
    }
    process.env.NODE == 'dev' && Object.assign(params, { env: 'local' });
    return await request.get(`${manageApiPath}/user/checkAuth`, {
        params: { ...params }
    })
}



function resourceList(payload){
    const url = `${resourcePath}/list`;
    return request.post(url, {...payload, teamId});
}

// task list
function getTakeList({current, size}){
    const url = `${enginePath}/engine/merged/job`;
    return request.get(url, {
        params: {
            current, size, status: 'RUNNING'
        }
    })
}

/**
 * 
 * Kill Pod
 */
function killPod(payload) {
    return request.post(`${manageApiPath}/model-api/pod/stop/vcjob`, { ...payload })
}

// 实名认证

const comApi = {
    getUserArea,
    checkAuth,
    resourceList,
    getTakeList,
    killPod,
};

export default comApi;