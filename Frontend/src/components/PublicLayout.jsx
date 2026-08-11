import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;