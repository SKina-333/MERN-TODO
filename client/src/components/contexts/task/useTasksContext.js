import { useContext } from 'react';
import TasksContext from './tasksContext.jsx';

const useTasksContext = () => {
  return useContext(TasksContext);
};

export default useTasksContext;
