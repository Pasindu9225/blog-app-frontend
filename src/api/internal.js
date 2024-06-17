import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_INTERNAL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  try {
    return await api.post("/login", data);
  } catch (error) {
    return error;
  }
};

export const signup = async (data) => {
  try {
    return await api.post("/register", data);
  } catch (error) {
    return error;
  }
};

export const signout = async () => {
  try {
    return await api.post("/logout");
  } catch (error) {
    return error;
  }
};

export const getAllBlogs = async () => {
  try {
    return await api.get("/blog/all");
  } catch (error) {
    return error;
  }
};

export const submitBlog = async (data) => {
  let response;
  try {
    response = await api.post("/blog", data);
  } catch (error) {
    return error;
  }
  return response;
};
