import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ==========================================
  // CHECKING SESSION
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm text-gray-500">
            Loading MockMate...
          </p>

        </div>
      </main>
    );
  }

  // ==========================================
  // ALREADY LOGGED IN
  // ==========================================

  if (user) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  return children;
};

export default PublicRoute;