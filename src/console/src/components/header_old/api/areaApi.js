import request from '../../../services/request';
import { enginePath } from '../../../services/httpClient';

export const lastVisitApp = (appId) => {
  return request.get(`${enginePath}/area/user-last-visit-info?moduleId=${appId}`);
}