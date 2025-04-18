import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { LoginFormData } from "@/types/forms";
import { useState } from "react";

export default function LoginForm() {
  const { useLogin } = useAuth();
  const login = useLogin();
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await login.mutateAsync(data);
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Login
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
                {...register("email", { required: "Email is required" })}
                className="mt-1 w-full"
                disabled={login.isPending}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <Input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 w-full"
                disabled={login.isPending}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending ? "Logging in..." : "Login"}
            </Button>
            <div className="text-center mt-4">or continue with</div>
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
              <span className="text-sm">Don't have an account? </span>
              <a
                href="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Register
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
