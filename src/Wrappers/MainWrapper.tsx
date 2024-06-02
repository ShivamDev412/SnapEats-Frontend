import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/redux/Store";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const MainWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useSelector((state: RootState) => state.loading);
  return (
    <div className="flex flex-col justify-between bg-zinc-900 min-h-screen text-zinc-100">
      <Header />
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <main className="flex-1 w-11/12 md:w-9/12 lg:w-8/12 mx-auto my-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainWrapper;
