import axiosInstance from "../lib/axios";
import { ApiResponse } from "./api";
import {
  LoginFormData,
  RegisterFormData,
  EmailFormData,
  OtpFormData,
  ResetPasswordFormData,
} from "../types/forms";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export class AuthService {
  private baseUrl = "/auth";

  async login(data: LoginFormData): Promise<ApiResponse<AuthResponse>> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/login`,
      data
    );
    return response.data;
  }

  async register(data: RegisterFormData): Promise<ApiResponse<AuthResponse>> {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      `${this.baseUrl}/register`,
      data
    );
    return response.data;
  }

  async sendOtp(data: EmailFormData): Promise<ApiResponse<void>> {
    const response = await axiosInstance.post<ApiResponse<void>>(
      `${this.baseUrl}/send-otp`,
      data
    );
    return response.data;
  }

  async verifyOtp(data: OtpFormData): Promise<ApiResponse<void>> {
    const response = await axiosInstance.post<ApiResponse<void>>(
      `${this.baseUrl}/verify-otp`,
      data
    );
    return response.data;
  }

  async resetPassword(data: ResetPasswordFormData): Promise<ApiResponse<void>> {
    const response = await axiosInstance.post<ApiResponse<void>>(
      `${this.baseUrl}/reset-password`,
      data
    );
    return response.data;
  }

  async acceptTerms(data: { accepted: boolean }): Promise<ApiResponse<void>> {
    const response = await axiosInstance.post<ApiResponse<void>>(
      `${this.baseUrl}/accept-terms`,
      data
    );
    return response.data;
  }
}
