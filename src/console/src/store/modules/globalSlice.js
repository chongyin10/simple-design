import { createSlice } from "@reduxjs/toolkit"
import defaultAvatarImg from "../../assets/image/portrait.svg"

const initialState = {
    avatarUrl: defaultAvatarImg,
    projectInfo: '',
}

export const getProjectInfo = (state) => (state.global.projectInfo);

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setProject(state, action) {
            console.log(action.payload)
            state.projectInfo = action.payload;
        }
    },
    extraReducers: (builder) => { },
})

export const {
    setProject,
} = globalSlice.actions;

export default globalSlice.reducer
