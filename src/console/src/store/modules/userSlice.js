import { createSlice } from "@reduxjs/toolkit"

const routerKeyList = [
  { id: 10, key: "admin" },
  { id: 5, key: "team_member" },
]

const initialState = {
  teamId: "",
  teamName: "",
  currentRoleIdList: [],
  roleKeyList: [],
  teamListInfoWithRole: [],
  phone:'',
  email:'',
  username:'',
  userId:'',
  roleId: ''
}

function mapRoleKeyList(roleIdList) {
  return routerKeyList
    .filter((item) => roleIdList.some((roleId) => roleId === item.id))
    .map((item) => item.key)
}

function getCurrentRoleIdList(teamId, teamListInfoWithRole) {
  const findResult = teamListInfoWithRole.find((item) => item.teamId === teamId)
  return findResult ? findResult.roleIdList : []
}



export const selectTeamName = (state) => state.user.teamName

export const selectTeamId = (state) => state.user.teamId
export const selectCurrentRoleIdList = (state) => state.user.currentRoleIdList
export const selectTeamListInfoWithRole = (state) =>
  state.user.teamListInfoWithRole
export const selectRoleKeyList = (state) => state.user.roleKeyList
export const selectUserPhone = (state)=>state.user.phone
export const selectUserEmail = (state)=>state.user.email
export const selectUserName = state=>state.user.username
export const selectUserId = state=>state.user.userId
export const selectUser = state=>state.user


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserBaseInfo(state,action){
      Object.assign(state, {...action.payload});
    },
    changeTeamIdAndName(state, action) {
      const { teamId, teamName } = action.payload
      state.teamId = teamId
      state.teamName = teamName
      state.currentRoleIdList = getCurrentRoleIdList(
        state.teamId,
        state.teamListInfoWithRole
      )
      state.roleKeyList = mapRoleKeyList(state.currentRoleIdList)
    },
    refreshTeamListInfo(state, action) {
      state.teamListInfoWithRole = action.payload
      state.currentRoleIdList = getCurrentRoleIdList(
        state.teamId,
        state.teamListInfoWithRole
      )
      state.roleKeyList = mapRoleKeyList(state.currentRoleIdList)
    },
    changeTeamIdAndTeamList(state, action) {
      const { teamListInfoWithRole, teamId, teamName } = action.payload
      state.teamListInfoWithRole = teamListInfoWithRole
      state.teamId = teamId
      state.teamName = teamName
      state.currentRoleIdList = getCurrentRoleIdList(
        state.teamId,
        state.teamListInfoWithRole
      )
      state.roleKeyList = mapRoleKeyList(state.currentRoleIdList)
    },
  },
})

export const {
  saveUserBaseInfo,
  changeTeamIdAndName,
  refreshTeamListInfo,
  changeTeamIdAndTeamList,
} = userSlice.actions

export default userSlice.reducer
