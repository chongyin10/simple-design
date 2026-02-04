import { userId } from '../../../utils/cookie';
import request from '../../../services/request';
import { manageApiPath } from '../../../services/httpClient';

function save(options) {
  const url = `${manageApiPath}/feedback/save`
  return request.post(url, { ...options, userId })
}

function saveFeedback(options) {
  const url = `${manageApiPath}/user/feedback/save`
  return request.post(url, { ...options, userId, category: 2 })
}

const feedbackApi = {
  save,
  saveFeedback
}

export default feedbackApi;
