import { manageApiPath, noteApiPath2 } from "../services/httpClient"
import {teamId,userId} from "../utils/cookie"
import request from "../services/request"

function splitGitRepoName(url) {
    const splitStr = url.split('.git')[0]
    const stringArr = splitStr.split('/')
    return stringArr[stringArr.length - 1]
}

const addProject = ({ gitUrl, username = '', password = '', token = '', projectName, datafile, index, total }, type = 'default') => {

    const creator = userId
    const formData = new FormData()

    if (type === 'git') {
        const projectDtoStr = {
            teamId,
            creator,
            projectName: splitGitRepoName(gitUrl),
            projectType: "git",
            gitUrl,
            gitInfo: {
                username,
                password,
                token,
            },
        }
        formData.append("datafile", null)
        formData.append("index", null)
        formData.append("total", null)
        formData.append("projectDtoStr", JSON.stringify(projectDtoStr))
    }
    if (type === 'default') {
        const projectDtoStr = {
            teamId,
            creator,
            projectName,
            projectType: "default",
        }
        formData.append("datafile", null)
        formData.append("index", null)
        formData.append("total", null)
        formData.append("projectDtoStr", JSON.stringify(projectDtoStr))
    }
    if (type === 'file') {
        const projectDtoStr = {
            teamId,
            creator,
            projectName,
            projectType: "file",
        }
        formData.append("datafile", datafile)
        formData.append("index", index)
        formData.append("total", total)
        formData.append("projectDtoStr", JSON.stringify(projectDtoStr))
    }
  return request.post(`${noteApiPath2}/project/new`, formData)
}

const getProjectInfo = (id) => {
  return request.get(`${manageApiPath}/project/get`, { params: { id, teamId } })
}

const getProjectPage = ({ current, size, name }) => {
    const data = { current, size, name }
    if (!name) {
        delete data.name
    }
    return request.get(`${manageApiPath}/project/getPage`, {
        params: { teamId, sortField: 'update_time', sort: 'desc', ...data},
    })
}

const deleteProject = (id) => {
  return request.post(`${noteApiPath2}/project/delete`, { id })
}

const updateProject = ({ id, name }) => {
    return request.post(`${manageApiPath}/project/update`, {
        id,
        name,
        owner: userId,
    })
}

const transProjectOwner = ({ id, owner }) => {
    return request.post(`${manageApiPath}/project/transOwner`, { id, owner, teamId })
}

const getFirstProject = ()=>{
  return request.get("/0/api/v1/project/getFirstProject",{
    params:{
      teamId
    }
  })
}

const projectApi = {
    getProjectPage,
    getProjectInfo,
    deleteProject,
    updateProject,
    transProjectOwner,
    addProject,
    getFirstProject
}
export default projectApi
