import { ServiceManager } from "../services";
import { apiRoutes } from "../services";

export const storeLoggedInUser = (token) => {
  localStorage.setItem("user_token", token);
};

export const getLoggedInUser = async () => {
  const token = localStorage.getItem("user_token");
  let user = null;

  if (token) {
    ServiceManager.getInstance().userToken = token;
  }

  try {
    user = await ServiceManager.getInstance().request(
      apiRoutes.getLoggedInUser
    );
  } catch (error) {
    console.log(error);
  }

  return user;
};
