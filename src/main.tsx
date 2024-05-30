import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import store from "./redux/Store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor } from "./redux/Store.ts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e83c54",
    },

    secondary: {
      main: "#ffffff",
    },
  },
});
window.addEventListener('vite:preloadError', () => {
  // window.reload()
  window.location.reload()
})
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer
            position="top-right"
            limit={1}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
