import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";
import { getAuthToken } from "./storage";

export const getAllPorjects = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/project`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};

export const createProject = async project => {
  const token = getAuthToken();
  const data = QueryString.stringify(project);
  const response = await axios.post(`${apiUrl}/project`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};

export const getAllProjectsByTeamId = async teamId => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/project/team/${teamId}`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};
