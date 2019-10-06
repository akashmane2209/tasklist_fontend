import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";
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

export const addTask = async task => {
  const data = QueryString.stringify(task);
  const token = getAuthToken();
  const response = await axios.post(`${apiUrl}/task`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};

export const updateTaskFlag = async taskId => {
  const token = getAuthToken();
  const response = await axios.put(`${apiUrl}/task/${taskId}`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};

export const getTasksByUserId = async userId => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/task/user/${userId}`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};
