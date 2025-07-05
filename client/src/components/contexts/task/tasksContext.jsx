import { createContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const TasksProvider = ({ children }) => {
  const [status, setStatus] = useState();
  const [tasksByStatus, setTasksByStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/api";

  const fetchData = async () => {
    try {
      const statusRes = await fetch(`${API_URL}/status`);
      if (!statusRes.ok) throw new Error("Failed to fetch statuses");
      const statusData = await statusRes.json();
      setStatus(statusData);

      const tasksByStatusTemp = {};
      for (const s of statusData) {
        const taskRes = await fetch(`${API_URL}/tasks/status/${s._id}`);
        if (!taskRes.ok) throw new Error(`Failed to fetch tasks for ${s.name}`);
        const { statusTasks, count } = await taskRes.json();
        tasksByStatusTemp[s._id] = {
          statusName: s.name, 
          statusTasks,
          count,
        };
      }
      console.log(tasksByStatusTemp)
      setTasksByStatus(tasksByStatusTemp);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Utility fetch wrapper with error handling
  const safeFetch = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`Failed request: ${res.statusText}`);
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  //Task Functions
  const getAllTasks = () => safeFetch(`${API_URL}/tasks`);

  const getTaskById = (taskId) => safeFetch(`${API_URL}/tasks/${taskId}`);

  const getTasksByStatus = (statusId) =>
    safeFetch(`${API_URL}/tasks/status/${statusId}`);

  const createTask = async (newTask) => {
    const savedTask = await safeFetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    await fetchData();
    return savedTask;
  };

  const updateTask = async (taskId, updatedData) => {
    const updatedTask = await safeFetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    await fetchData();
    return updatedTask;
  };

  const deleteTask = async (taskId) => {
    await safeFetch(`${API_URL}/tasks/${taskId}`, { method: "DELETE" });
    await fetchData();
  };

  //Status Functions
  const getAllStatus = () => safeFetch(`${API_URL}/status`);

  const getStatusById = (statusId) =>
    safeFetch(`${API_URL}/status/${statusId}`);

  const createStatus = async (newStatus) => {
    const savedStatus = await safeFetch(`${API_URL}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStatus),
    });
    await fetchData();
    return savedStatus;
  };

  const updateStatus = async (statusId, updatedData) => {
    const updatedStatus = await safeFetch(`${API_URL}/status/${statusId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    await fetchData();
    return updatedStatus;
  };

  const deleteStatus = async (statusId) => {
    await safeFetch(`${API_URL}/status/${statusId}`, { method: "DELETE" });
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        status,
        tasksByStatus,
        loading,
        error,
        
        createTask,
        getTaskById,
        updateTask,
        deleteTask,
        createStatus,
        getStatusById,
        updateStatus,
        deleteStatus,
        getAllStatus,
        getAllTasks,
        getTasksByStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
