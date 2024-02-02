import { Link, useLocation } from 'react-router-dom';

export const SidebarItem = ({ icon, text, alert, route }: any) => {
  const location = useLocation();
  const isActive = location.pathname === route;

  return (
    <div className="px-2">
      <Link
        to={route}
        className={`relative flex items-center py-2 px-3 my-1 cursor-pointer rounded
                ${
                  isActive
                    ? 'bg-accent text-black dark:text-white'
                    : 'hover:bg-accent dark:text-white dark:hover:bg-gray-900'
                }`}
      >
        {icon}
        <span className="overflow-hidden transition-all w-52 ml-3">{text}</span>
        {alert && <div className="absolute right-4 w-2 h-2 rounded bg-slate-400" />}
      </Link>
    </div>
  );
};
