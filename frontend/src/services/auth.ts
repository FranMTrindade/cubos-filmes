import { LoginDto, RegisterDto, TokenResponse } from "@/types/auth";
import api from "./api";


export const authService = {
  async register(data: RegisterDto): Promise<TokenResponse> {
    const res = await api.post("/auth/register", data);
    return res.data;
  },

  async login(data: LoginDto): Promise<TokenResponse> {
    const res = await api.post("/auth/login", data);
    return res.data;
  },

  async refresh(refresh_token: string): Promise<TokenResponse> {
    const res = await api.post("/auth/refresh", { refresh_token });
    return res.data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  },
};
