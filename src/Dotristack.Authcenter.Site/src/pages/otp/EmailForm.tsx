import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmailFormInputs {
    email: string;
}

export default function EmailForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailFormInputs>();

    const onSubmit = (data: EmailFormInputs) => {
        console.log("Email submitted for OTP:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Enter Email</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } })}
                                className="mt-1 w-full"
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <Button type="submit" className="w-full">Send OTP</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
