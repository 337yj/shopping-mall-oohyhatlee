import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from '../../context/AuthContext';
import Footer from './Footer';
import Header from './Header';

const queryClient = new QueryClient();
const Layout = () => {
  return (
    // 유즈쿼리쓸 땐 우산 씌우기
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Header />
        <Outlet />
        {/* main페이지 안에 아우터넣기 */}
        <Footer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Layout;
