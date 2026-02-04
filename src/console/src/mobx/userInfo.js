import { action, observable,decorate } from "mobx"

class UserInfo {
  constructor() {
    this.data = {}
  }
  updateUserInfo(userInfo){
    this.data = userInfo
  }

}
decorate(UserInfo, {
  data: observable,
  updateUserInfo: action
})

const userInfo = new UserInfo()

export default userInfo
