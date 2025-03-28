import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingRadialMenu from "./components/FloatingRadialMenu";
import WelcomePage from "./pages/WelcomePage";
import EmailForm from "./pages/EmailForm";
import LoginForm from "./pages/LoginForm";
import OtpForm from "./pages/OtpForm";
import RegisterForm from "./pages/RegisterForm";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import TermsAndConditionsForm from "./pages/TermsAndConditionsForm";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Routes>z
          <Route
            path="/"
            element={
              <WelcomePage
                orgName="DoTriStack"
                userName="Loki"
                userEmail="Dativerse@gmail.com"
                userRole="Administrator"
              />
            }
          />
          <Route path="emai" element={<EmailForm />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="otp" element={<OtpForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="reset-password" element={<ResetPasswordForm />} />
          <Route
            path="terms-and-conditions"
            element={<TermsAndConditionsForm />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Floating Radial Menu (outside Routes to persist across routes) */}
        <FloatingRadialMenu />
      </div>
    </BrowserRouter>
  );
};

export default App;
