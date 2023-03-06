import AuthProvider from "../context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosProvider from "../components/AxiosProvider";
import BottomNav from "../components/BottomNav";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <AxiosProvider />
      <Component {...pageProps} />
      <BottomNav />
    </AuthProvider>
  );
}
