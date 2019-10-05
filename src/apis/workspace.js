import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";
import { getAuthToken } from "./storage";

export const addWorkspace = async data => {
  try {
    const token = getAuthToken();
    data = QueryString.stringify(data);
    const response = await axios.post(`${apiUrl}/workspace`, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllWorkspaces = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${apiUrl}/workspace`, {
      headers: {
        Authorization: token
      }
    });
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
