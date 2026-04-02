/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { loginApi, registerApi } from "../api/authApi";

const AuthContext = createContext(null);

const TOKEN_KEY = "finance_token";
const USER_KEY = "finance_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  const persistAuth = (authToken, authUser) => {
    localStorage.setItem(TOKEN_KEY, authToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  };

  const login = async (payload) => {
    const response = await loginApi(payload);
    persistAuth(response.data.token, response.data.user);
    return response.data;
  };

  const register = async (payload) => {
    const response = await registerApi(payload);
    persistAuth(response.data.token, response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
