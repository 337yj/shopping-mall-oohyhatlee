import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";
import Footer from "./Footer";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop";

const queryClient = new QueryClient();
const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ScrollToTop />
        <Header />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;
