import request from '../../../services/request';
import { userId, teamId } from '../../../utils/cookie';
import { manageApiPath } from '../../../services/httpClient';

export const newCreatorTeam = (data) => {
    return request.post(`${manageApiPath}/admin/team/new`, {
        ...data,
        teamId,
        userId,
    })
}

// 切换团队
export const switchTeam = ({ teamId, userId }) => {
    return request.post(`${manageApiPath}/admin/team/switch`, {
        teamId,
        userId
    })
}

// 管理员团队列表
export const getTeamList = () => {
    return request.get(`${manageApiPath}/admin/team/team-list`, {
        params: {
            teamId,
            userId,
            handTryCatch: true
        },
    })
}

// 团队成员列表
export const getTeamMemberList = () => {
    return request.get(`${manageApiPath}/admin/team/member-list`, {
        params: {
            teamId,
            userId,
        },
    })
}