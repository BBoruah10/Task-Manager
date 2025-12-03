// src/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // authState holds { token, user } or null
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem("tm_auth");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) localStorage.setItem("tm_auth", JSON.stringify(auth));
    else localStorage.removeItem("tm_auth");
  }, [auth]);

  // call to register endpoint (if your backend returns token + user)
  const signup = async ({ fullname, email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/register", { fullname, email, password });
      // expecting { token, user } — adapt if backend uses other names
      const payload = res.data;
      const token = payload?.token ?? payload?.accessToken ?? null;
      const user = payload?.user ?? payload?.userDto ?? payload ?? null;

      if (!token) {
        // if backend does not return token on signup, still store user only (no auth)
        setAuth(user ? { token: null, user } : null);
        return payload;
      }

      const authObj = { token, user };
      setAuth(authObj);

      return authObj;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // login -> expect { token, user }
  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/login", { email, password });
      const payload = res.data;
      const token = payload?.token ?? payload?.accessToken ?? null;
      const user = payload?.user ?? payload?.userDto ?? payload ?? null;

      if (!token) {
        // backend did not return token — treat as error
        throw new Error("No token returned from server");
      }

      const authObj = { token, user };
      setAuth(authObj);
      return authObj;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth(null);
    // also let axios interceptor redirect if needed; but here we just clear auth
    localStorage.removeItem("tm_auth");
    // optionally navigate to sign-in route:
    if (typeof window !== "undefined") window.location.replace("/signin");
  };

  // helper to access current user
  const getUser = () => auth?.user ?? null;

  // expose auth, user, and methods
  return (
    <AuthContext.Provider
      value={{
        auth,
        user: getUser(),
        loading,
        signup,
        login,
        logout,
        isAuthenticated: !!auth?.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
