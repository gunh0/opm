import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import userReducer from "./slice/user";

const reducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      const combineReducer = combineReducers({
        user: userReducer,
      });
      return combineReducer(state, action);
    }
  }
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

const createStore = () => store;

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

const wrapper = createWrapper(createStore);

export default wrapper;
