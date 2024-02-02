import { StickyNote } from 'lucide-react';
import { SidebarItem } from './SideBarItem';
import { useTranslation } from 'react-i18next';

export const SideBar = ({ isSidebarOpen }: any) => {
  const { t } = useTranslation();

  const sidebarClasses = isSidebarOpen ? '' : 'hidden lg:block';

  return (
    <>
      <aside
        className={`fixed left-0 z-30 w-64 h-full backdrop-blur font-normal duration-75 border-r ${sidebarClasses}`}
      >
        <div className="flex flex-col flex-1 relative min-h-0 pt-0 dark:border-gray-700">
          <SidebarItem icon={<StickyNote />} text={t('title')} route="/" exact counter={50} />
        </div>
      </aside>
    </>
  );
};
