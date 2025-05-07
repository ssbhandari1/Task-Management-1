import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux.hooks";
import { getAllTasksThunk } from "@/redux/task/thunk";

const useGetTask = () => {
  const dispatch = useAppDispatch();
  const { tasks, hasFetched } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id && !hasFetched) {
      dispatch(getAllTasksThunk());
    }
  }, [user?.id, hasFetched, dispatch]);

  return { tasks, user };
};

export default useGetTask;