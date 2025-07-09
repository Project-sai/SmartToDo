import { useState } from 'react';
import TaskList from './TaskList';
import { useTasks } from '../context/TaskContext';

const BucketTabs = () => {
  const { categorizedTasks } = useTasks();
  const [activeTab, setActiveTab] = useState('ongoing');

  const tabClasses = (isActive) => 
    `px-4 py-3 font-medium text-sm flex items-center ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`;

  const countClasses = (tab) => {
    const base = 'ml-2 py-0.5 px-2 rounded-full text-xs';
    switch (tab) {
      case 'ongoing': return `${base} bg-blue-100 text-blue-800`;
      case 'success': return `${base} bg-green-100 text-green-800`;
      case 'failure': return `${base} bg-red-100 text-red-800`;
      default: return base;
    }
  };

  return (
    <div>
      <div className="flex border-b border-gray-200 px-4">
        <button
          className={tabClasses(activeTab === 'ongoing')}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing
          <span className={countClasses('ongoing')}>
            {categorizedTasks.ongoing.length}
          </span>
        </button>
        <button
          className={tabClasses(activeTab === 'success')}
          onClick={() => setActiveTab('success')}
        >
          Completed
          <span className={countClasses('success')}>
            {categorizedTasks.success.length}
          </span>
        </button>
        <button
          className={tabClasses(activeTab === 'failure')}
          onClick={() => setActiveTab('failure')}
        >
          Overdue
          <span className={countClasses('failure')}>
            {categorizedTasks.failure.length}
          </span>
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'ongoing' && (
          <TaskList tasks={categorizedTasks.ongoing} emptyMessage="No ongoing tasks. Add a new task to get started!" />
        )}
        {activeTab === 'success' && (
          <TaskList tasks={categorizedTasks.success} emptyMessage="No completed tasks yet. Keep going!" />
        )}
        {activeTab === 'failure' && (
          <TaskList tasks={categorizedTasks.failure} emptyMessage="No overdue tasks. Great job staying on track!" />
        )}
      </div>
    </div>
  );
};

export default BucketTabs;