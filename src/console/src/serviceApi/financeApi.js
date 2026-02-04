import { getTeamId, userId } from "../utils/cookie"
import { shopApiPath } from "../services/httpClient"
import request from "../services/request"

const getFinanceAccount = () => {
  return request.post(`${shopApiPath}/finance/account`, {
    teamId: getTeamId(),
  })
}

const financeApi = {
  getFinanceAccount,
}

export default financeApi
