import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";
import { getAuthToken } from "./storage";

export const getAllMessages = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/message`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};

export const addMessage = async message => {
  const token = getAuthToken();
  const data = QueryString.stringify(message);
  const response = await axios.post(`${apiUrl}/message`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};
