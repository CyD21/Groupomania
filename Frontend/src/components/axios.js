import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API;
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

//Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = localStorage.getItem("token");
    return config; //It is often used with token. Configure the token value to the token key and put the token key in the request header
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axios;
