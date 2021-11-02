import axios from "axios";
import auth from "../components/pages/auth/authService";
const headers = { authorization: `Bearer ${auth.getJWT()}` };
export const axiosInstanse = axios.create({
  baseURL: "http://localhost:6005/",
  headers,
});
