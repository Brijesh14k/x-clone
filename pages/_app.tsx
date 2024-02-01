import Layout from "@/components/Layout";
import { LoginModal } from "@/components/layout/modals/loginModal";
import { RegisterModal } from "@/components/layout/modals/RegisterModal copy";
// import { Modal } from "@/components/Modal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <> 
  <LoginModal/>
  <RegisterModal/>
  {/* <Modal isOpen actionLabel="SUbmit" title="Title"/> */}
  <Layout>
    <Component {...pageProps} />
  </Layout>
  </>
}
