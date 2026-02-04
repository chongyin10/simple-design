import { configureStore } from "@reduxjs/toolkit"
import global from "./modules/globalSlice";
import user from "./modules/userSlice";
import files from "./modules/fileSlice";
export const store = configureStore({
  reducer: {
    global,
    user,
    files
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
})
