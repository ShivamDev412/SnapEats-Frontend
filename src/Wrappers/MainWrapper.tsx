import Footer from "@/components/Footer";
import Header from "@/components/Header";

const MainWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col justify-between bg-zinc-900 h-screen text-zinc-100">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainWrapper;
