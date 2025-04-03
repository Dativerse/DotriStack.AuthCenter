import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { RegisterFormData } from "@/types/forms";
import { useState } from "react";

export default function RegisterForm() {
  const { useRegister } = useAuth();
  const register = useRegister();
  const [error, setError] = useState<string>("");

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError("");
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await register.mutateAsync(data);
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <Input
                type="text"
                {...registerField("firstName", {
                  required: "First name is required",
                })}
                className="mt-1 w-full"
                disabled={register.isPending}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <Input
                type="text"
                {...registerField("lastName", {
                  required: "Last name is required",
                })}
                className="mt-1 w-full"
                disabled={register.isPending}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input
                type="email"
                {...registerField("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="mt-1 w-full"
                disabled={register.isPending}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <Input
                type="password"
                {...registerField("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="mt-1 w-full"
                disabled={register.isPending}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm Password
              </label>
              <Input
                type="password"
                {...registerField("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="mt-1 w-full"
                disabled={register.isPending}
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
              disabled={register.isPending}
            >
              {register.isPending ? "Registering..." : "Register"}
            </Button>
            <div className="text-center mt-4">or sign up with</div>
            <div className="flex justify-center space-x-4 mt-2">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 shadow hover:bg-gray-300"
              >
                <FcGoogle size={24} />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 shadow text-white hover:bg-blue-700"
              >
                <FaFacebook size={24} />
              </a>
            </div>
            <div className="text-center mt-4">
              <span className="text-sm">Already have an account? </span>
              <a
                href="/login"
                className="text-sm text-blue-600 hover:underline"
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
