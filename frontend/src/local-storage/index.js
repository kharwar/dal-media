/*
  Created on July 10th 2022
  Author: Kavya Kasaraneni
*/

import { ServiceManager } from "../services";
import { apiRoutes } from "../services";

export const storeLoggedInUser = (token) => {
  localStorage.setItem("user_token", token);
};

//code for getting user details from local storage
export const getLoggedInUser = async () => {
  const token = localStorage.getItem("user_token");
  let user = null;

  if (token) {
    ServiceManager.getInstance().userToken = token;
  }

  try {
    const res = await ServiceManager.getInstance().request(
      apiRoutes.getLoggedInUser
    );

    if (res.data) {
      user = res.data;
    }
  } catch (error) {}

  return user;
};
