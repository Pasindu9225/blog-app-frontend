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
  try {
    return await api.post("/blog", data);
  } catch (error) {
    return error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/blog/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const getCommentById = async (id) => {
  try {
    const response = await api.get(`/comment/${id}`, {
      validateStatus: false,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postComment = async (data) => {
  let response;
  try {
    response = await api.post("/comment", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/blog/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateBlog = async (data) => {
  let response;
  try {
    response = await api.put(`/blog`, data);
  } catch (error) {
    return error;
  }
  return response;
};

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    if (
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_INTERNAL_API}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }
  }
);
