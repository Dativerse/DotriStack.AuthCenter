import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

interface RegisterFormInputs {
    name: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>();

    const onSubmit = (data: RegisterFormInputs) => {
        console.log("Register data:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Register</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <Input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="mt-1 w-full"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className="mt-1 w-full"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Phone Number</label>
                            <Input
                                type="tel"
                                {...register("phone", { required: "Phone number is required" })}
                                className="mt-1 w-full"
                            />
                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Address</label>
                            <Input
                                type="text"
                                {...register("address", { required: "Address is required" })}
                                className="mt-1 w-full"
                            />
                            {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <Input
                                type="date"
                                {...register("dateOfBirth", { required: "Date of birth is required" })}
                                className="mt-1 w-full"
                            />
                            {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Password</label>
                            <Input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                className="mt-1 w-full"
                            />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <Input
                                type="password"
                                {...register("confirmPassword", { required: "Please confirm your password" })}
                                className="mt-1 w-full"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
                        </div>
                        <Button type="submit" className="w-full">Register</Button>
                        <div className="text-center mt-4">or sign up with</div>
                        <div className="flex justify-center space-x-4 mt-2">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 shadow hover:bg-gray-300">
                                <FcGoogle size={24} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 shadow text-white hover:bg-blue-700">
                                <FaFacebook size={24} />
                            </a>
                        </div>
                        <div className="text-center mt-4">
                            <span className="text-sm">Already have an account? </span>
                            <a href="#" className="text-sm text-blue-600 hover:underline">Login</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
