import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResetPasswordFormInputs {
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ResetPasswordFormInputs>();

    const onSubmit = (data: ResetPasswordFormInputs) => {
        console.log("Password reset data:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">New Password</label>
                            <Input
                                type="password"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
                                className="mt-1 w-full"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <Input
                                type="password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: value => value === watch("password") || "Passwords do not match"
                                })}
                                className="mt-1 w-full"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                        </div>
                        <Button type="submit" className="w-full">Reset Password</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
