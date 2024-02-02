import { NavBarSidebar } from '@/shared/components/NavBarSidebar';
import { SideBar } from '@/shared/components/Sidebar';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';

export const Layout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950">
      <NavBarSidebar setIsSidebarOpen={setIsSidebarOpen} />
      <aside>
        <SideBar isSidebarOpen={isSidebarOpen} />
      </aside>
      <main className="relative flex-1 overflow-y-auto lg:ml-64 p-2">{children}</main>
    </div>
  );
};
