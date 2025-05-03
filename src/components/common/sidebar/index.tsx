import { FC } from 'react';
import Link from 'next/link';
import { MdOutlineLibraryBooks } from "react-icons/md";
import { GrTasks } from "react-icons/gr";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  console.log(toggleSidebar)
  return (
    <div
      className={`fixed inset-0 z-30 lg:relative lg:w-64 lg:block transition-all duration-300 transform bg-gray-200 text-white
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:h-full`}
    >

      <div className="py-4 px-2">
		<div className='flex items-center gap-2 text-gray-800 p-2 mt-3'>
			<GrTasks className='text-2xl'/>
			 <h2 className='font-semibold text-xl'>Task Management</h2>
			 </div>
        <ul className='mt-4'>
          <li className="flex items-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 p-2 mt-3">
            <MdOutlineLibraryBooks />
            <Link href="/backlog">Backlog</Link>
          </li>
          <li className="flex items-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 p-2 mt-3">
            <MdOutlineLibraryBooks />
            <Link href="/active-board">Active Board</Link>
          </li>
          <li className="flex items-center gap-2 text-gray-600 hover:bg-gray-300 hover:text-gray-700 p-2 mt-3">
            <MdOutlineLibraryBooks />
            <Link href="/task">task</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;