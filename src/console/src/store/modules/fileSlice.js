import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    zipVisibleFlgs: false,
    zipCompresPercentData: 0,
}

export const zipVisible = (state) => (state.files.zipVisibleFlgs)
export const zipCompresPercent = (state) => (state.files.zipCompresPercentData)

export const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        setZipCompresPercent(state, action) {
            state.zipCompresPercentData = action.payload;
        },
        setZipVisible(state, action) {
            state.zipVisibleFlgs = action.payload;
        },
    },
})

export const {
    setZipCompresPercent,
    setZipVisible
} = fileSlice.actions

export default fileSlice.reducer
