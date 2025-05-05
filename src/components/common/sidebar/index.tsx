import { FC } from 'react';
import Link from 'next/link';
import { GrTasks } from 'react-icons/gr';
import { MdOutlineLibraryBooks } from 'react-icons/md';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  { label: 'Backlog', href: '/backlog' },
  { label: 'Active Board', href: '/active-board' },
  { label: 'Task', href: '/task' },
];

interface SidebarContentProps {
  variant: 'desktop' | 'mobile';
  onClose?: () => void;
}

const SidebarContent: FC<SidebarContentProps> = ({ variant, onClose }) => {
  const isMobile = variant === 'mobile';

  return (
    <div className={isMobile ? 'py-2' : 'py-4 px-2'}>
      <div
        className={`flex items-center text-gray-800 gap-2 relative ${
          isMobile ? 'mt-2' : 'p-2 mt-3'
        }`}
      >
        <GrTasks className="text-2xl" />
        <h2 className={`font-semibold ${isMobile ? 'text-md' : 'text-xl'}`}>
          Task Management
        </h2>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="absolute right-0 p-2 rounded-full text-black text-2xl focus:outline-none"
          >
            &times;
          </button>
        )}
      </div>
      <ul className="mt-4">
        {menuItems.map(({ label, href }) => (
          <li
            key={href}
            className="flex items-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 p-2 mt-3"
          >
            <MdOutlineLibraryBooks />
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-64 bg-gray-200 text-white z-30 transition-all duration-300">
        <SidebarContent variant="desktop" />
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-[250px] h-full bg-gray-200 z-50 p-3">
          <SidebarContent variant="mobile" onClose={toggleSidebar} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
