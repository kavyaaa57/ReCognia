
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

const AppLayout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 relative">
        {!isMobile && (
          <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-64 overflow-y-auto z-10">
            <Sidebar />
          </div>
        )}
        <main className={`flex-1 p-4 md:p-6 overflow-auto ${!isMobile ? 'ml-64' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
