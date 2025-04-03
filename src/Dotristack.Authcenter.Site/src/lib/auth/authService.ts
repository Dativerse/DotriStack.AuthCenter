import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { TokenManager } from "./tokenManager";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}

interface AuthError extends Error {
  status?: number;
  code?: string;
}

export class AuthService {
  private static readonly REFRESH_TOKEN_ENDPOINT = "/auth/refresh-token";
  private static readonly LOGIN_ENDPOINT = "/login";

  static async refreshToken(baseURL: string): Promise<string> {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post<RefreshTokenResponse>(
        `${baseURL}${this.REFRESH_TOKEN_ENDPOINT}`,
        { refreshToken }
      );

      const { token, refreshToken: newRefreshToken } = response.data;

      TokenManager.setToken(token);
      if (newRefreshToken) {
        TokenManager.setRefreshToken(newRefreshToken);
      }

      return token;
    } catch (error) {
      const authError = this.handleAuthError(error);
      throw authError;
    }
  }

  static handleAuthError(error: unknown): AuthError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const authError = new Error(axiosError.message) as AuthError;
      authError.status = axiosError.response?.status;
      authError.code = axiosError.code;
      return authError;
    }
      
    return error as AuthError;
  }

  static async handleTokenExpiration(
    error: AxiosError,
    baseURL: string
  ): Promise<AxiosResponse> {
    const originalRequest = error.config as RetryableRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await this.refreshToken(baseURL);
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        this.handleRefreshFailure();
        throw refreshError;
      }
    }

    throw error;
  }

  private static handleRefreshFailure(): void {
    TokenManager.clearTokens();
    window.location.href = this.LOGIN_ENDPOINT;
  }

  static isAuthError(error: unknown): boolean {
    if (axios.isAxiosError(error)) {
      return error.response?.status === 401;
    }
    return false;
  }
}
