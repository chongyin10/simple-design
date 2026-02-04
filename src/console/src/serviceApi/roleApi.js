import request from "../services/request"


function getRoleList() {
  return request.get('/0/api/v1/admin/role/getRoleList')
}

const roleApi = {
  getRoleList
}

export default roleApi


