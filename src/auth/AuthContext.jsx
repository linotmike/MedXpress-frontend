import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ROLES } from "./roles";

const AuthContext = createContext(null);

const STORAGE_KEY = "medxpress_auth_dev";

const defaultAuth = {
  isAuthenticated: false,
  user: null, // { id, name, role }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(defaultAuth);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      setAuth(parsed);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  const api = useMemo(() => {
    return {
      auth,
      loginDev(role = ROLES.PATIENT) {
        setAuth({
          isAuthenticated: true,
          user: { id: "dev-user", name: "Dev User", role },
        });
      },
      logout() {
        setAuth(defaultAuth);
      },
      setRole(role) {
        setAuth((prev) => {
          if (!prev.isAuthenticated || !prev.user) return prev;
          return { ...prev, user: { ...prev.user, role } };
        });
      },
    };
  }, [auth]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
