import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import BucketTabs from '../components/BucketTabs';
import Spinner from '../components/Spinner';
import { useTasks } from '../context/TaskContext';

const Home = () => {
  const { loading, createTask } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleFormSubmit = async (taskData) => {
    if (currentTask) {
      return;
    }
    await createTask(taskData);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Smart Todo List
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Organize your tasks efficiently with our intuitive todo manager
          </p>
        </header>
        <div className="flex justify-between items-center mb-8 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
            <p className="text-sm text-gray-500">Stay productive and organized</p>
          </div>
          <button
            onClick={() => {
              setCurrentTask(null);
              setIsFormOpen(true);
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span>Add New Task</span>
          </button>
        </div>
        {isFormOpen && !currentTask && (
          <div className="mb-8 animate-fade-in">
            <TaskForm 
              onClose={() => setIsFormOpen(false)} 
              onSave={handleFormSubmit}
            />
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          {loading ? (
            <div className="py-20">
              <Spinner />
            </div>
          ) : (
            <BucketTabs />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;