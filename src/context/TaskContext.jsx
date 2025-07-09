import { createContext, useContext, useState, useEffect } from 'react';
import { mockApi } from '../api/mockApi';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getTasks();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showToast('Failed to fetch tasks', 'error');
    }
  };

  const createTask = async (task) => {
    try {
      setLoading(true);
      const newTask = await mockApi.createTask(task);
      setTasks(prev => [...prev, newTask]);
      setLoading(false);
      showToast('Task created successfully!');
      return newTask;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showToast('Failed to create task', 'error');
    }
  };

const updateTask = async (id, updates) => {
  try {
    setLoading(true);
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update task');
    const updatedTask = await response.json();
    setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    setLoading(false);
    showToast('Task updated successfully!');
  } catch (err) {
    setError(err.message);
    setLoading(false);
    showToast('Failed to update task', 'error');
  }
};

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await mockApi.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      setLoading(false);
      showToast('Task deleted successfully!');
    } catch (err) {
      setError(err.message);
      setLoading(false);
      showToast('Failed to delete task', 'error');
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Categorize tasks into buckets
  const categorizeTasks = () => {
    const now = new Date();
    return tasks.reduce((acc, task) => {
      if (task.isCompleted) {
        acc.success.push(task);
      } else if (new Date(task.deadline) < now) {
        acc.failure.push(task);
      } else {
        acc.ongoing.push(task);
      }
      return acc;
    }, { ongoing: [], success: [], failure: [] });
  };

  // Effect to check for deadline changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prev => [...prev]); 
    }, 60000); // Check everyminute

    return () => clearInterval(interval);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      categorizedTasks: categorizeTasks(),
      loading,
      error,
      toast,
      createTask,
      updateTask,
      deleteTask,
      showToast,
      fetchTasks // Expose fetchTasks for manual refresh if needed
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);