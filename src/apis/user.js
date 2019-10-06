import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";
import { getAuthToken } from "./storage";

export const loginUser = async credentials => {
  const data = QueryString.stringify(credentials);
  const response = await axios.post(`${apiUrl}/user/login`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};

export const getAllUsers = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/user`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};

export const getUserById = async userId => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/user/${userId}`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};

export const getUsersByTeamId = async teamId => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/user/team/${teamId}`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};

export const addUser = async user => {
  const token = getAuthToken();
  const data = QueryString.stringify(user);
  const response = await axios.post(`${apiUrl}/user/signup`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};
