import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux.hooks";
import { getUserTaksThunk } from "@/redux/task/thunk";

const useGetTask = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id && (!tasks || tasks.length === 0)) {
      const fetchUserTasks = async () => {
        try {
          await dispatch(getUserTaksThunk(user.id));
        } catch (error) {
          console.error("Error fetching user tasks:", error);
        }
      };
      fetchUserTasks();
    }
  }, [user?.id, tasks, dispatch]);

  return { tasks, user };
};

export default useGetTask;