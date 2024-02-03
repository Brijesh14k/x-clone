import Layout from "@/components/Layout";
import { LoginModal } from "@/components/layout/modals/loginModal";
import { RegisterModal } from "@/components/layout/modals/RegisterModal";
// import { Modal } from "@/components/Modal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider session={pageProps.sessions}> 
  <Toaster/>
  <LoginModal/>
  <RegisterModal/>
  {/* <Modal isOpen actionLabel="SUbmit" title="Title"/> */}
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </SessionProvider>
}
