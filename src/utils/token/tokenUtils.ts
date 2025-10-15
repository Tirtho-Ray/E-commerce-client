/* eslint-disable @typescript-eslint/no-unused-vars */
import {jwtDecode} from "jwt-decode";

const ACCESS_TOKEN_KEY = "accessToken";

export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};


export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const decodeToken = (token: string) => {
  try {
    const pureToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    return jwtDecode<{
      _id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      exp: number;
    }>(pureToken);
  } catch (err) {
    console.error("Token Decode Error:", err);
    return null;
  }
};



export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  const decoded = decodeToken(token);
  console.log("decodeToken:",decoded)
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
