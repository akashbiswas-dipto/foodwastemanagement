import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete task.');
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow w-72">
          <h2 className="font-bold">{task.title}</h2>
          <p className="text-sm text-gray-500">Food Category: {task.foodCategory}</p>
          <p className="text-sm text-gray-500">Description: {task.description}</p>
          <p className="text-sm text-gray-500">Quantity: {task.quantity}</p>
          <p className="text-sm text-gray-500">Pickup Window End: {new Date(task.deadline).toLocaleDateString()}</p>
          <p className="text-sm text-gray-500">Pickup Location: {task.location}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingTask(task)}
              className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-green-900 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-green-900 text-white px-4 py-2 rounded"
            >
              Status Change
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
