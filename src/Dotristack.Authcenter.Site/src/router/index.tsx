import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import EmailForm from "@/pages/EmailForm";
import OtpForm from "@/pages/OtpForm";
import RegisterForm from "@/pages/RegisterForm";
import ResetPasswordForm from "@/pages/ResetPasswordForm";
import TermsAndConditionsForm from "@/pages/TermsAndConditionsForm";
import LoginForm from "@/pages/LoginForm";
import WelcomePage from "@/pages/WelcomePage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <WelcomePage
            orgName="DoTriStack"
            userName="Loki"
            userEmail="Dativerse@gmail.com"
            userRole="Administrator"
          />
        ),
      },
      { path: "emai", element: <EmailForm /> },
      { path: "login", element: <LoginForm /> },
      { path: "otp", element: <OtpForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "reset-password", element: <ResetPasswordForm /> },
      { path: "terms-and-conditions", element: <TermsAndConditionsForm /> },
    ],
  },
]);

export default router;
