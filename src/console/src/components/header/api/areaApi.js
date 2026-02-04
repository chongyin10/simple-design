import request from '../../../services/request';
import { areaPath } from '../../../services/httpClient';

export const lastVisitApp = (appId) => {
    return request.get(`${areaPath}/user-last-visit-info?moduleId=${appId}`);
}