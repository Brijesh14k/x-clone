import Layout from "@/components/Layout";
import { LoginModal } from "@/components/layout/modals/loginModal";
import { RegisterModal } from "@/components/layout/modals/RegisterModal";
// import { Modal } from "@/components/Modal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { EditModal } from "@/components/layout/modals/EditModal";

export default function App({ Component, pageProps }: AppProps) {
  return <SessionProvider session={pageProps.sessions}> 
  <Toaster/>
  <LoginModal/>
  <RegisterModal/>
  <EditModal/>
  {/* <Modal isOpen actionLabel="SUbmit" title="Title"/> */}
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </SessionProvider>
}
