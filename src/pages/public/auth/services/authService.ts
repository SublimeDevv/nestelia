import type { ApiResponse } from "@/types";
import { httpClient } from "../../../../services/httpClient";
import type {
  User,
  LoginRequest,
  RegisterRequest,
} from "@/pages/public/auth/interfaces";

const baseURL = import.meta.env.API_URL || "/api";
const authURL = `${baseURL}/auth`;

export class AuthService {
  async login(credentials: LoginRequest): Promise<ApiResponse<User>> {
    return httpClient.post<ApiResponse<User>>(`${authURL}/login`, credentials);
  }

  async register(data: RegisterRequest): Promise<ApiResponse<User>> {
    return httpClient.post<ApiResponse<User>>(`${authURL}/register`, data);
  }

  async logout(): Promise<ApiResponse<User>> {
    return httpClient.post<ApiResponse<User>>(`${authURL}/logout`);
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return httpClient.get<ApiResponse<User>>(`${authURL}/me`);
  }
}

export const authService = new AuthService();
