import axios from "axios";
import { snackbar } from "../components";

export default class ServiceManager {
  static myInstance = null;
  static axiosInstance = null;
  userToken = "";

  static getInstance() {
    if (ServiceManager.myInstance == null) {
      ServiceManager.myInstance = new ServiceManager();
    }
    return this.myInstance;
  }

  static initialize = (baseURL, authHeader) => {
    ServiceManager.getInstance().axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 60000,
      headers: authHeader,
    });
    ServiceManager.getInstance().axiosInstance.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] =
          ServiceManager.getInstance().userToken;
        return config;
      },
      (error) => {
        return error;
      }
    );
  };

  request = (url, params, method = "get") => {
    const data = method === "get" ? null : params;
    const PARAMS = method === "post" ? null : params;
    const reqParams = {
      method,
      url,
      data,
      params: PARAMS,
    };
    if (ServiceManager.getInstance().axiosInstance !== null) {
      return new Promise((resolve, reject) => {
        ServiceManager.getInstance()
          .axiosInstance.request(reqParams)
          .then((res) => {
            if (res.status === 200) {
              resolve({
                data: res.data?.data,
                message: res.data?.message ?? "",
                status: res.status,
              });
            }
          })
          .catch((error) => {
            reject(ServiceManager.checkError(error));
          });
      });
    }
  };

  static checkError = (error) => {
    if (error?.response) {
      const status = error.response.status;
      let errors = null;
      if (error.response.data?.message) {
        const messages = error.response.data?.message;
        const isMsgArray = Array.isArray(messages);

        if (isMsgArray) {
          errors = "• " + messages.join("\n• ");
        } else {
          errors = messages;
        }
      }

      if (errors) snackbar.current?.showSnackbar(true, errors);
      // console.log(
      //   "--------------------------------------------------------------------------------------",
      //   "\n- ERROR : ",
      //   errors,
      //   "\n--------------------------------------------------------------------------------------"
      // );

      return errors;
    }
  };
}
