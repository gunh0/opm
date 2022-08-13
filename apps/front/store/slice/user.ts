import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "opm-models";

export interface UserState extends Partial<UserInfo> {}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (_, action: PayloadAction<UserInfo>) => {
      return { ...action.payload };
    },
    logout: () => {
      return {};
    },
  },
  extraReducers: {
    HYDRATE: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
