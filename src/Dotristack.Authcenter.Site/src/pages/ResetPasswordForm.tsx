import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ResetPasswordFormData } from "@/types/forms";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPasswordForm() {
  const { useResetPassword } = useAuth();
  const resetPassword = useResetPassword();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email,
      otp,
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setError("");
      if (data.newPassword !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await resetPassword.mutateAsync(data);
      // Navigate to login after successful password reset
      navigate("/login", {
        state: {
          message:
            "Password reset successful. Please login with your new password.",
        },
      });
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Password reset failed:", err);
    }
  };

  if (!email || !otp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardContent>
            <p className="text-center text-red-500">
              Invalid reset password link. Please try again.
            </p>
            <Button
              onClick={() => navigate("/forgot-password")}
              className="w-full mt-4"
            >
              Go to Forgot Password
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <Input
                type="password"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                  },
                })}
                className="mt-1 w-full"
                disabled={resetPassword.isPending}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                className="mt-1 w-full"
                disabled={resetPassword.isPending}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={resetPassword.isPending}
            >
              {resetPassword.isPending
                ? "Resetting Password..."
                : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
