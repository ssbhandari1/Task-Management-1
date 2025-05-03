import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux.hooks';
import { verifyAuth } from '@/redux/auth/thunk';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  const getAuth = async () => {
    try {
      await dispatch(verifyAuth());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAuth();
  }, [dispatch]);

  return { isAuthenticated, loading };
};