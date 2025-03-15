import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-com">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
