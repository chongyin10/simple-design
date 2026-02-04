
import { userId, teamId } from '../../../utils/cookie';
import request from '../../../services/request';
import { adminApiPath, manageApiPath } from '../../../services/httpClient';

function isUnRead() {
    const url = `${adminApiPath}/notification/status`;
    return request.get(url)
}

const getProjectInfo = (id) => {
    return request.get(`${manageApiPath}/project/get`, {
        params: { id, teamId },
    })
}

const getProjectPage = ({ current, size, name }) => {
    return request.get(`${manageApiPath}/project/getPage`, {
        params: { teamId, current, size, name, sortField: 'update_time', sort: 'desc' },
    })
}

const deleteProject = (id) => {
    return request.post(`${manageApiPath}/project/delete`, { id })
}

const addOrUpdateProject = ({ id, name }) => {
    return request.post(`${manageApiPath}/project/update`, {
        id,
        name,
        owner: userId,
    })
}

const transProjectOwner = ({ id, owner }) => {
    return request.post(`${manageApiPath}/project/transOwner`, {
        id,
        owner,
        teamId,
    })
}

const getFirstProject = () => {
    return request.get(`${manageApiPath}/project/getFirstProject`, {
        params: {
            teamId
        }
    })
}

const Api = {
    isUnRead,
    getProjectPage,
    getProjectInfo,
    deleteProject,
    addOrUpdateProject,
    transProjectOwner,
    getFirstProject
}

export default Api;