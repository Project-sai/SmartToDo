
let tasks = [
  {
    id: '1',
    title: 'Complete project',
    description: 'Finish the Smart Todo List project',
    deadline: new Date(Date.now() + 86400000).toISOString(),
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Review code',
    description: 'Check for bugs and improvements',
    deadline: new Date(Date.now() + 172800000).toISOString(),
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Write documentation',
    description: 'Document all features and API endpoints',
    deadline: new Date(Date.now() - 86400000).toISOString(), 
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Test application',
    description: 'Perform end-to-end testing',
    deadline: new Date(Date.now() + 259200000).toISOString(), 
    isCompleted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Simulate network delay
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 150));

export const mockApi = {
  async getTasks() {
    await simulateNetworkDelay();
    return [...tasks];
  },

  async createTask(newTask) {
    await simulateNetworkDelay();
    const task = {
      ...newTask,
      id: crypto.randomUUID(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(task);
    return task;
  },

  async updateTask(id, updates) {
    await simulateNetworkDelay();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    const updatedTask = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    tasks[index] = updatedTask;
    return updatedTask;
  },

  async deleteTask(id) {
    await simulateNetworkDelay();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    tasks.splice(index, 1);
    return { id };
  }
};