

import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaUserCircle, FaBell, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import Loading from '../loading';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hooks';
import axios from 'axios';
import { verifyAuth } from '@/redux/auth/thunk';

const Header = () => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
   const pathName = usePathname();
    const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/login')
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res.status === 200) {
        dispatch(verifyAuth());
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if(loading){
  return (
    <><Loading/></>
  )
  }

  return (
    <nav className="flex items-center justify-between py-3 px-4 bg-blue-900 text-white shadow-md">
      <h1 className="font-semibold text-xl">Task Management</h1>
      {
        pathName === '/auth/login' || pathName === '/auth/signup' ?
          <></> :
          isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaUserCircle size={24} className="cursor-pointer" />
              </div>

              <FaBell size={24} className="cursor-pointer" />

              <FaSignOutAlt
                size={24}
                className="cursor-pointer hover:text-red-500"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <button
              className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              onClick={handleLogin}
            >
              <FaSignInAlt size={20} />
              <span>Log in</span>
            </button>
          )
      }
    
    </nav>
  );
};

export default Header;