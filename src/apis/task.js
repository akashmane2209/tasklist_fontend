import apiUrl from "./apiUrl";
import axios from "axios";
import { getAuthToken } from "./storage";

export const getAllTasks = async () => {
  const token = await getAuthToken();
  const response = await axios.get(`${apiUrl}/task`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};
