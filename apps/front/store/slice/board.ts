import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BoardInfo } from "opm-models";

export interface BoardState extends Partial<BoardInfo> {}

const initialState: BoardState = {};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    getBoard: (state) => {
      return { ...state };
    },
    setBoard: (state, action: PayloadAction<BoardInfo>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { getBoard, setBoard } = boardSlice.actions;

const boardReducer = boardSlice.reducer;

export default boardReducer;
