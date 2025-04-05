import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/authService";
import {
  LoginFormData,
  RegisterFormData,
  EmailFormData,
  OtpFormData,
  ResetPasswordFormData,
} from "../types/forms";

const authService = new AuthService();

export function useAuth() {
  const navigate = useNavigate();

  const useLogin = () => {
    return useMutation({
      mutationFn: (data: LoginFormData) => authService.login(data),
      onSuccess: (response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      },
    });
  };

  const useRegister = () => {
    return useMutation({
      mutationFn: (data: RegisterFormData) => authService.register(data),
      onSuccess: (response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      },
    });
  };

  const useSendOtp = () => {
    return useMutation({
      mutationFn: (data: EmailFormData) => authService.sendOtp(data),
    });
  };

  const useVerifyOtp = () => {
    return useMutation({
      mutationFn: (data: OtpFormData) => authService.verifyOtp(data),
    });
  };

  const useResetPassword = () => {
    return useMutation({
      mutationFn: (data: ResetPasswordFormData) =>
        authService.resetPassword(data),
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  const useAcceptTerms = () => {
    return useMutation({
      mutationFn: (data: { accepted: boolean }) =>
        authService.acceptTerms(data),
    });
  };

  return {
    useLogin,
    useRegister,
    useSendOtp,
    useVerifyOtp,
    useResetPassword,
    useAcceptTerms,
  };
}
