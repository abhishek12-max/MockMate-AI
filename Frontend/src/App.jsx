import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Landing from "./pages/Landing";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import WhyMockMate from "./pages/WhyMockMate";

import VerifyOtp from "./pages/VerifyOtp";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import InterviewHistory from "./pages/InterviewHistory";
import Reports from "./pages/Reports";
import Report from "./pages/Report";

import PublicLayout from "./components/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";

const App = () => {
  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

         

          <Route
            path="/"
            element={
              <PublicRoute>
                <PublicLayout>
                  <Landing />
                </PublicLayout>
              </PublicRoute>
            }
          />

          <Route
            path="/features"
            element={
              <PublicRoute>
                <PublicLayout>
                  <Features />
                </PublicLayout>
              </PublicRoute>
            }
          />

          <Route
            path="/how-it-works"
            element={
              <PublicRoute>
                <PublicLayout>
                  <HowItWorks />
                </PublicLayout>
              </PublicRoute>
            }
          />

          <Route
            path="/why-mockmate"
            element={
              <PublicRoute>
                <PublicLayout>
                  <WhyMockMate />
                </PublicLayout>
              </PublicRoute>
            }
          />

          {/* Register */}

          <Route
            path="/register"
            element={
              <PublicRoute>
                <PublicLayout>
                  <Register />
                </PublicLayout>
              </PublicRoute>
            }
          />

          {/* Login */}

          <Route
            path="/login"
            element={
              <PublicRoute>
                <PublicLayout>
                  <Login />
                </PublicLayout>
              </PublicRoute>
            }
          />

          {/* Verify OTP */}

          <Route
            path="/verify-otp"
            element={
              <PublicRoute>
                <PublicLayout>
                  <VerifyOtp />
                </PublicLayout>
              </PublicRoute>
            }
          />

          {/* Forgot Password */}

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <PublicLayout>
                  <ForgotPassword />
                </PublicLayout>
              </PublicRoute>
            }
          />

         

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/resume"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Resume />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/interviews/setup"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InterviewSetup />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/interviews/history"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <InterviewHistory />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Reports />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/interviews/:interviewId/report"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Report />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/interviews/:interviewId"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Interview />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
};

export default App;