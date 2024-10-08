import axios from "axios";
import { url } from "../const";
import { useDispatch } from "react-redux";
import { setUserLogout } from "../redux/reducer/authslice";


const BACKEND_URI = url
  ? url
  : "";

export const api = token => {
  if (typeof token === "string" && token.split(".").length === 3)
    return axios.create({
      baseURL: `${BACKEND_URI}/`,
      headers: { Authorization: `Bearer ${token}` }
    });
  else
    return axios.create({
      baseURL: `${BACKEND_URI}/`
    });
};


export const handleResponse = res => {
  try {
    const data = res.data;
    if (res.data.error) {
      const error = data.message ? data.message : data.error;
      return Promise.reject(error);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleError = err => {
  if (err?.response?.status === 401) {
    localStorage.setItem("isLogin", false);
    localStorage.setItem("accessToken", null);
    document.cookie = document.cookie = `token= ;SameSite=strict;max-age=0}`;
    if (window.location.pathname !== "/" || window.location.pathname !== "/") {

      window.location = "/";
    }
  }
  return err?.response?.data;
};
