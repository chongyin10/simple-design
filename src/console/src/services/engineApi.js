import { resourcePath, areaPath, enginePath, manageApiPath } from './httpClient';
import request from "./request"
import axios from 'axios';
import { region, teamId, userId } from '../utils/cookie';

function resourceList(payload){
  const url = `${resourcePath}/list`;
  return request.post(url, {...payload, teamId});
}

function getAreaList(){
  const url = `${areaPath}/list`;
  return request.get(url)
}


function getInstances({areaId}){
  const url = `${enginePath}/engine/merged/instances`
  return request.get(url, {params: {areaId: areaId+''}})
}

function getStorage({areaId}){
  const url = `${enginePath}/engine/merged/storage`;
  return request.get(url, {params: {areaId: areaId+''}})
}

// unsubscribe
function unsubscribe(resourceId){
  const url = `${resourcePath}/unsubscribe/${resourceId}`;
  return request.put(url);
}

// delete
function deleteItem(resourceId){
  const url = `${resourcePath}/delete/${resourceId}`;
  return request.delete(url);
}


// task list
function getTakeList(payload){
  const url = `${enginePath}/engine/merged/job`;
  return request.get(url, {
    params: {
      ...payload
    }
  })
}

// job info
function getJobInfo(jobId){
  const url = `${enginePath}/engine/merged/job`;
  return request.get(url, {
    params: {
      jobId,
      current: 1,
      size: 10
    }
  })
}

function getTaskList({jobId, current, size}){
  const url = `${enginePath}/engine/merged/task`;
  return request.get(url, {
    params: {
      jobId,
      current,
      size
    }
  })
}

function getJobDetail({id}){
  const url = `${enginePath}/engine/merged/job-detail`;
  return request.get(url, {
    params: {
      id
    }
  })

}

/**
 * 
 * Kill Pod
 */
function KillPod (payload){
  return request.post(`${manageApiPath}/model-api/model-market/deploy/cancel-vcjob-by-name`, {...payload})
}

// 工作优先级
function jobPriority({ jobInstanceId, priority, userId, teamId, projectId, kernelSource, areaId, name }) {
  const url = `${enginePath}/engine/merged/modify-job-priority`
  const data = {
    jobInstanceId,
    priority,
    userId: userId,
    teamId: teamId,
    kernelSource,
    projectId: projectId.toString(),
    areaId, 
    name
  }
  return request.post(url, data)
}

//取团队工作任务标签
function getTeamTaskTag() {
  const url = `${manageApiPath}/admin-rs/dashboard/team/task-monitor-list-tab`
  return axios.get(url)
}



const engineApi = {
  resourceList,
  getAreaList,
  getInstances,
  getStorage,
  unsubscribe,
  deleteItem,
  getTakeList,
  getJobInfo,
  getTaskList,
  KillPod,
  jobPriority,
  getTeamTaskTag,
  getJobDetail
}



export default engineApi
