import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F5F5]">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        Copyright © e-clinic. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;