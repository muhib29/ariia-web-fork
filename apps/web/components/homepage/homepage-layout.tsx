import type React from 'react';
import { Header } from './header/header';

interface HomepageLayoutProps {
  children: React.ReactNode;
}

const HomepageLayout = ({ children }: HomepageLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default HomepageLayout;
