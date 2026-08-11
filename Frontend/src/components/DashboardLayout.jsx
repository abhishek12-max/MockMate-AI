import DashboardSidebar from "../components/DashboardSidebar";
import DashboardNavbar from "../components/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Desktop Sidebar */}
      <DashboardSidebar />

      {/* Mobile Navbar */}
      <DashboardNavbar />

      {/* Page Content */}
      <main className="min-h-screen lg:ml-64">
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;