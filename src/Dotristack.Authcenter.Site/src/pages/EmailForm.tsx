import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { EmailFormData } from "@/types/forms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailForm() {
  const { useSendOtp } = useAuth();
  const sendOtp = useSendOtp();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>();

  const onSubmit = async (data: EmailFormData) => {
    try {
      setError("");
      await sendOtp.mutateAsync(data);
      // Navigate to OTP verification page with email
      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.error("OTP send failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Enter Email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="mt-1 w-full"
                disabled={sendOtp.isPending}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={sendOtp.isPending}
            >
              {sendOtp.isPending ? "Sending OTP..." : "Send OTP"}
            </Button>
            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
