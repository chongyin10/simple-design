import { userId, teamId } from '../../../utils/cookie';
import request from '../../../services/request';
import { productApiPath } from '../../../services/httpClient';

export const getRegionList = () => {
  const url = `${productApiPath}/resource/getRegionList?teamId=${teamId}`;
  return request.get(url);
}