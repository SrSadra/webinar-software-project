import apiClient from "../utils/api-client";
import { data } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const tokenName = "token";

export async function signup(user, profile) {
  console.log("user" , user);
  // const body = new FormData();
  // // body.append("name", user.name);
  // body.append("email", user.email);
  // body.append("username", user.username);
  // body.append("firstname", user.firstname);
  // body.append("phoneNumber", user.phoneNumber);
  // body.append("password", user.password);

  const { data } = await apiClient.post("/auth/signup", user);
}

export async function login(user) {
  const { data } = await apiClient.post("/auth/login", user);
  console.log(data);
  localStorage.setItem("tokenName", data.token);
}

export async function logout() {
  try {
    // Call the backend logout endpoint
    await apiClient.post('/auth/logout');
    
    // Remove local storage items (optional)
    localStorage.removeItem("tokenName");
    // Redirect to homepage
    // window.location = "/";
  } catch (error) {
    console.error('Logout failed:', error);
  } finally {
  }
}

export function getUser() {
  try {
    const jwt = localStorage.getItem("tokenName");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("tokenName");
}