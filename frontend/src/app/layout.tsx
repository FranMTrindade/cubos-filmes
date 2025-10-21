"use client";

import "antd/dist/reset.css";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css"; 

import { ConfigProvider, Layout, theme } from "antd";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/authContext";
import { ThemeProvider } from "@/context/themeContext";
import Providers from "./provider";
import { ToastContainer } from "react-toastify";
import Header from "./components/header";
import Footer from "./components/footer";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  return (
    <html lang="pt-BR">
      <body
        className={` antialiased bg-black text-white`}
      >
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#8E4EC6",
              colorText: "#BDBDBD",
              colorBgContainer: "#232225",
              colorTextPlaceholder: "#6F6D78",
              colorIcon: "#6F6D78",
              colorIconHover: "#8E4EC6",
              borderRadius: 4,
              controlOutlineWidth: 0,
              boxShadow: "none",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ThemeProvider>
                <Providers>
                  <Layout className="min-h-screen">
                     <ToastContainer
                      position="top-right"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                    />
                    {!isAuthPage && <Header />}
                    <Layout.Content className="flex-1 min-h-screen">
                      {children}
                    </Layout.Content>
                    {!isAuthPage && <Footer />}
                  </Layout>
                </Providers>
              </ThemeProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
