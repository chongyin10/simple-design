
import request from "../services/request"
import { fileApiPath } from '../utils/cookies';

export const getSystemBulletinLatest = () => {
  return request.get(`${fileApiPath}/user/system-bulletin/latest`)
}