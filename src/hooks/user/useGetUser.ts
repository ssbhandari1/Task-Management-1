import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux.hooks";
import { fetchUsersThunk } from "@/redux/users/thunk";

const useGetUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return { users, loading, error };
};

export default useGetUsers;
