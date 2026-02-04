import { teamId, userId } from "../utils/cookie"
import { manageApiPath, adminRsPath, enginePath } from "../services/httpClient"
import request from "../services/request"

// 管理员团队列表
const getTeamList = () => {
  return request.get(`${manageApiPath}/admin/team/team-list`, {
    params: {
      teamId,
      userId,
      handTryCatch: true
    },
  })
}

// 团队成员列表
const getTeamMemberList = () => {
  return request.get(`${manageApiPath}/admin/team/member-list`, {
    params: {
      teamId,
      userId,
    },
  })
}

// 获取团队待加入成员列表
const getAwaitAddTeamList = ({size, current}) => {
  return request.get(`${manageApiPath}/admin/team/invite-member-list`, {
    params: {
      teamId,
      userId,
      size,
      current
    },
  })
}

// 新建团队
const newCreatorTeam = (data) => {
  return request.post(`${manageApiPath}/admin/team/new`, {
    ...data,
    teamId,
    userId,
  })
}

// 团队改名
const renameTeam = ({teamName}) => {
  return request.post(`${manageApiPath}/admin/team/update`, {
    teamId,
    userId,
    teamName
  })
}

// 切换团队
const switchTeam = ({teamId, userId}) => {
  return request.post(`${manageApiPath}/admin/team/switch`, {
    teamId,
    userId
  })
}

// 邀请加入团队
const inviteToJoinTeam = (data) => {
  return request.post(`${manageApiPath}/admin/team/invite-team`, {
    ...data,
    teamId,
    userId,
  })
}

// 重新邀请加入团队 admin/team/reinvite-member
const reinviteToJoinTeam = (data) => {
  return request.post(`${manageApiPath}/admin/team/reinvite-member`, {
    ...data,
    teamId,
    userId,
  })
}
// 团队成员撤销
const removeMember = (data) => {
  return request.post(`${manageApiPath}/admin/team/member-remove`, {
    ...data,
    teamId,
    userId,
  })
}

// 移交团队
const turnOver = ({userId}) => {
  const url = `${adminRsPath}/user-information/handover-admin`
  return request.post(url, {userId})
}

// 是否实名认证
const isAuthentication  = (memberName) => {
  const url = `${manageApiPath}/user/sw/getAuthInfo`
  return request.get(url, {params: {memberName}})
}

const authenticate = (payload) => {
  const url = `${manageApiPath}/user/sw/doVerify`
  return request.post(url, {...payload})
}


const getGlobalConfigList = (payload) => {
  return request.get(`${enginePath}/operation/global-config-list`, {
    params: {...payload, current: 1, size: 9999}
  })
}


// is authentification 
const isOpenAuthentification = () => {
  const url = `${enginePath}/operation/global-config-detail?moduleName=auth`
  return request.get(url)
}

const teamApi = {
  getTeamList,
  getTeamMemberList,
  getAwaitAddTeamList,
  newCreatorTeam,
  inviteToJoinTeam,
  reinviteToJoinTeam,
  removeMember,
  renameTeam,
  switchTeam,
  turnOver,
  isAuthentication,
  authenticate,
  getGlobalConfigList,
  isOpenAuthentification
}
export default teamApi
