import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { TermsAndConditionsFormData } from "@/types/forms";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditionsForm() {
  const { useAcceptTerms } = useAuth();
  const acceptTerms = useAcceptTerms();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TermsAndConditionsFormData & { thirdPartyAccess: boolean }>();

  const onSubmit = async (
    data: TermsAndConditionsFormData & { thirdPartyAccess: boolean }
  ) => {
    try {
      setError("");
      await acceptTerms.mutateAsync({ accepted: data.accepted });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to accept terms. Please try again.");
      console.error("Terms acceptance failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-medium text-center text-gray-800">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Please review and accept to continue
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="border p-4 rounded bg-gray-100 text-sm text-gray-700">
            By using this service, you agree to our Terms and Conditions. Please
            read them carefully.
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="accepted"
              {...register("accepted", {
                required: "You must agree to continue",
              })}
              disabled={acceptTerms.isPending}
            />
            <label htmlFor="accepted" className="text-sm text-gray-700">
              I agree to the Terms and Conditions
            </label>
          </div>
          {errors.accepted && (
            <p className="text-red-500 text-xs">{errors.accepted.message}</p>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="thirdPartyAccess"
              {...register("thirdPartyAccess")}
              disabled={acceptTerms.isPending}
            />
            <label htmlFor="thirdPartyAccess" className="text-sm text-gray-700">
              I allow third-party services to access my data
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
            disabled={acceptTerms.isPending}
          >
            {acceptTerms.isPending ? "Processing..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
