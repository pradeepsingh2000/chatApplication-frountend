import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  id:"",
  isLogin: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLogin = true;
      state.token = action.payload.token;
      state.id = action.payload.user._id
    },
    setUserLogout:() => {
      state.isLogin = false;
      state.token = "";
      state.id = ""
    }
  },
});

export const { setUser ,setUserLogout } = authSlice.actions;

export const loginUser = (state) => state.auth;

export default authSlice.reducer;