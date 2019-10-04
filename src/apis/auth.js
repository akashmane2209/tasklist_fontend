import apiUrl from "./apiUrl";
import axios from "axios";
import QueryString from "query-string";

export const loginUser = async credentials => {
  const data = QueryString.stringify(credentials);
  const response = await axios.post(`${apiUrl}/user/login`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return response;
};
