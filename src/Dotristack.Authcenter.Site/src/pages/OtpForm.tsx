import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { OtpFormData } from "@/types/forms";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OtpForm() {
  const { useVerifyOtp, useSendOtp } = useAuth();
  const verifyOtp = useVerifyOtp();
  const resendOtp = useSendOtp();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    defaultValues: {
      email,
    },
  });

  const onSubmit = async (data: OtpFormData) => {
    try {
      setError("");
      await verifyOtp.mutateAsync({ ...data, email });
      navigate("/reset-password", { state: { email, otp: data.otp } });
    } catch (err) {
      setError("Invalid OTP. Please try again.");
      console.error("OTP verification failed:", err);
    }
  };

  const handleResendOtp = async () => {
    try {
      setError("");
      await resendOtp.mutateAsync({ email });
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
      console.error("Resend OTP failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Enter OTP
          </CardTitle>
          <p className="text-center text-sm text-gray-500 mt-2">
            We've sent a verification code to {email}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium">OTP Code</label>
              <Input
                type="text"
                {...register("otp", {
                  required: "OTP is required",
                  minLength: { value: 6, message: "OTP must be 6 digits" },
                  maxLength: { value: 6, message: "OTP must be 6 digits" },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="mt-1 w-full text-center tracking-widest text-lg"
                disabled={verifyOtp.isPending}
                maxLength={6}
              />
              {errors.otp && (
                <p className="text-red-500 text-xs">{errors.otp.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={verifyOtp.isPending}
            >
              {verifyOtp.isPending ? "Verifying..." : "Verify OTP"}
            </Button>
            <div className="text-center mt-4">
              <span className="text-sm">Didn't receive the code? </span>
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
                disabled={resendOtp.isPending}
              >
                {resendOtp.isPending ? "Resending..." : "Resend OTP"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
