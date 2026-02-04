
import { userId, teamId } from '../../../utils/cookie';
import request from '../../../services/request';
import { manageApiPath } from '../../../services/httpClient';

export const getUserInfo = () => {
  return request.get(`${manageApiPath}/user/getUserInfo`, { params: { userId } })
}

export const logout = () => {
  return request.get(`${manageApiPath}/user/logout`)
}
