import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ==========================================
  // CHECKING AUTH
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm text-gray-500">
            Checking your session...
          </p>

        </div>
      </main>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  // ==========================================
  // LOGGED IN
  // ==========================================

  return children;
};

export default ProtectedRoute;