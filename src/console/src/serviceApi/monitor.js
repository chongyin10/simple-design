import { getTeamId, region, userId } from "../utils/cookie"
import request from "../services/request"
import { adminRsPath } from "../services/httpClient"

const teamId = getTeamId();

function pieChartData() {
    const url = `${adminRsPath}/dashboard/team/task-monitor-total?teamId=${teamId}`;
    return request.get(url)
}

function getTabTypeList() {
    return request.get(`${adminRsPath}/dashboard/team/task-monitor-list-tab?teamId=${teamId}`)
}

function getJobInstanceList(kernelSource, current, size, projectId) {
    const params = {
        kernelSource,
        current,
        size
    };
    if (projectId) Object.assign(params, { projectId })
    return request.get(`${adminRsPath}/dashboard/team/task-monitor-job-instance-page`, {
        params: { ...params }
    })
}

function getTaskList(kernelSource, jobInstanceId, current, size, sort, sortField, projectId) {
    let url = `${adminRsPath}/dashboard/team/task-monitor-page?kernelSource=${kernelSource}&jobInstanceId=${jobInstanceId}&current=${current}&size=${size}&teamId=${teamId}&projectId=${Number(projectId)}`;
    if (sortField) {
        url += `&sortField=${sortField}`;
    }
    if (sort) {
        url += `&sort=${sort}`;
    }
    return request.get(url)
}

function getTeamMonitor() {
    return request.get(`${adminRsPath}/dashboard/team/projects-monitor-total`, {
        params: {
            teamId
        }
    })
}

const Api = {
    pieChartData,
    getTabTypeList,
    getJobInstanceList,
    getTaskList,
    getTeamMonitor
}

export default Api;