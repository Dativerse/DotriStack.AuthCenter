import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OtpFormInputs {
    otp: string;
}

export default function OtpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OtpFormInputs>();

    const onSubmit = (data: OtpFormInputs) => {
        console.log("OTP entered:", data);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">Enter OTP</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">OTP Code</label>
                            <Input
                                type="text"
                                {...register("otp", { required: "OTP is required", minLength: 6, maxLength: 6 })}
                                className="mt-1 w-full text-center tracking-widest text-lg"
                            />
                            {errors.otp && <p className="text-red-500 text-xs">{errors.otp.message}</p>}
                        </div>
                        <Button type="submit" className="w-full">Verify OTP</Button>
                        <div className="text-center mt-4">
                            <span className="text-sm">Didn't receive the code? </span>
                            <a href="#" className="text-sm text-blue-600 hover:underline">Resend OTP</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
