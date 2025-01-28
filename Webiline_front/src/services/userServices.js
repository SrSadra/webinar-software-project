import apiClient from "../utils/api-client";
import { data } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const tokenName = "token";

export async function signup(user, profile) {
  console.log("user" , user);
  const body = new FormData();
  // body.append("name", user.name);
  body.append("email", user.email);
  body.append("username", user.username);
  body.append("firstname", user.firstname);
  body.append("phoneNumber", user.phoneNumber);
  body.append("password", user.password);

  const { data } = await apiClient.post("/auth/signup", user);
  // console.log(data);
}

export async function login(user) {
  const { data } = await apiClient.post("/auth/login", user);
  console.log(data);
  localStorage.setItem("tokenName", data.token);
}

export function logout() {
  localStorage.removeItem("tokenName");
}

export function getUser() {
  try {
    const jwt = localStorage.getItem("tokenName");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}
