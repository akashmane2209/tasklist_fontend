import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";
import { getAuthToken } from "./storage";

export const getAllTeams = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${apiUrl}/team`, {
    headers: {
      Authorization: token
    }
  });
  return response;
};
