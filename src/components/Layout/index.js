import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from '../context/AuthContext';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <AuthContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </AuthContextProvider>
  );
};

export default Layout;