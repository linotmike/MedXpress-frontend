import { http } from "./http";

export const authApi = {
  login: (identifier, password) => {
    return http.post("/api/auth/login", { identifier, password });
  },
};
