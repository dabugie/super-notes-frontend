import { Button } from '@/components';
import { AlignLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ToggleMode } from './ToggleMode';
import { LanguageMode } from './LanguageMode';
import { UserNav } from './UserNav';

export const NavBarSidebar = ({ setIsSidebarOpen }: any) => {
  const toggleSidebar = () => setIsSidebarOpen((prev: any) => !prev);

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur border-gray-200 dark:border-gray-700">
      <div className="px-3 py-1.5 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="p-2 cursor-pointer lg:hidden" onClick={toggleSidebar}>
              <AlignLeft />
            </Button>
            <Link to={'/'} className="flex md:mr-24 p-2">
              <span className="text-xl font-semibold whitespace-nowrap dark:text-white">SuperNotes</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageMode />
            <ToggleMode />
            <UserNav />
          </div>
        </div>
      </div>
    </nav>
  );
};
