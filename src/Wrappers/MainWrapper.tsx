import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/redux/Store";
import { USER_ROUTES } from "@/utils/Constants";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { Backdrop, CircularProgress } from "@mui/material";
import useAccountType from "@/Hooks/useAccountType";

const MainWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useSelector((state: RootState) => state.loading);
  const location = useLocation();
  const navigation = useNavigate();
  const pathName = location.pathname.split("/")[1];
  const isUser = useAccountType();
  useEffect(() => {
    if (isUser && pathName === "store") {
      navigation(BROWSER_ROUTE.HOME);
    } else if (!isUser && USER_ROUTES.includes(`/${pathName}`)) {
      navigation(BROWSER_ROUTE.STORE_DASHBOARD);
    }
  }, [pathName]);
  return (
    <div className="flex flex-col justify-between bg-zinc-900 min-h-screen text-zinc-100">
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {isUser ? (
        <>
          <Header />{" "}
          <main className="flex-1 w-11/12 md:w-9/12 lg:w-8/12 mx-auto my-5 lg:my-10 justify-center flex">
            {children}
          </main>
          <Footer />
        </>
      ) : (
        <div className="flex h-full justify-between flex-1">
          <Aside />
          <main className="flex-1 w-9/12 ml-10 my-10">{children}</main>
        </div>
      )}
    </div>
  );
};

export default MainWrapper;
