export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface EmailFormData {
  email: string;
}

export interface OtpFormData {
  otp: string;
  email: string;
}

export interface ResetPasswordFormData {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TermsAndConditionsFormData {
  accepted: boolean;
}
