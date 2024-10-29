import { useState } from 'react';
import { FaPlus, FaCheck, FaSearch } from 'react-icons/fa';
import { format } from 'date-fns';
import bgImg from '../assets/bgimg.jpg';
function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task One', status: 'Pending', deadline: '2024-11-01' },
    { id: 2, name: 'Task Two', status: 'Completed', deadline: '2024-10-29' },
  ]);
  const [newTask, setNewTask] = useState({ name: '', deadline: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (newTask.name && newTask.deadline) {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, name: newTask.name, status: 'In Progress', deadline: newTask.deadline },
      ]);
      setNewTask({ name: '', deadline: '' });
    }
  };

  const toggleStatus = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: task.status === 'Completed' ? 'In Progress' : 'Completed' } : task
    ));
  };

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  }).filter(task => 
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gray-100" style={{
      backgroundImage: `url(${bgImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tasks</h2>
      
      {/* New Task Input */}
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="border p-2 mr-2 w-1/3"
        />
        <input
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          className="border p-2 mr-2 w-1/3"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded flex items-center">
          <FaPlus className="mr-2" /> Add Task
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex mb-4">
        <select onChange={handleFilterChange} className="border p-2 mr-2">
          <option value="All">All</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>
        <div className="flex items-center border p-2 w-1/3">
          <FaSearch className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className={`flex justify-between p-2 border-b last:border-b-0 
              ${task.status === 'Completed' ? 'text-green-600' : 'text-red-600'} 
              ${new Date(task.deadline) < new Date() && task.status !== 'Completed' ? 'bg-red-200' : ''}`}
            onClick={() => toggleStatus(task.id)}
          >
            <span className="flex items-center">
              {task.name}
              {new Date(task.deadline) < new Date() && task.status !== 'Completed' && (
                <span className="ml-2 text-red-500">Overdue</span>
              )}
            </span>
            <span>{format(new Date(task.deadline), 'yyyy-MM-dd')}</span>
            <span className="cursor-pointer">
              {task.status === 'Completed' ? <FaCheck className="text-green-500" /> : 'In Progress'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
