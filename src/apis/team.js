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

export const addTeam = async team => {
  const token = getAuthToken();
  const response = await axios.post(`${apiUrl}/team`, team, {
    header: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  });
  return response;
};

export const addUserToTeam = async (userId, teamId) => {
  const token = getAuthToken();
  console.log(userId, teamId);
  const data = QueryString.stringify({ userId });
  const response = await axios.put(
    `${apiUrl}/team/${teamId}?update=user`,
    data,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  return response;
};
