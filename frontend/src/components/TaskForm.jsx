import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '',foodCategory:'', description: '',quantity:'', deadline: '',location:'' });

   useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || '',
        foodCategory: editingTask.foodCategory || '',
        description: editingTask.description || '',
        deadline: editingTask.deadline || '',
        quantity: editingTask.quantity || '',
        location: editingTask.location || ''
      });
    } else {
      setFormData({ title: '',foodCategory:'', description: '',quantity:'', deadline: '',location:''  });
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({ title: '', foodCategory: '', description: '', deadline: '', quantity: '', location: '' });
    } catch (error) {
      alert('Failed to save task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4 text-center">{editingTask ? 'Edit Log Food Contribution' : 'Log Food Contribution'}</h1>
      <h5>Title:</h5>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <h5>Food Category:</h5>
      <select
          value={formData.foodCategory}
          onChange={(e) => setFormData({ ...formData, foodCategory: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="" disabled>Select Food Category</option>
          <option value="Cooked Meals">Cooked Meals</option>
          <option value="Bakery">Bakery</option>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Beverages">Beverages</option>
          <option value="Packaged">Packaged</option>
          <option value="other">Other</option>
        </select>
      <h5>Description:</h5>
      <input
        type="text"
        placeholder="include ingredients/allergens; 20–500 chars"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded" minlength="20" maxLength="500"
      />
      <h5>Quantity:</h5>
      <select
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          className="w-full mb-4 p-2 border rounded" required
        >
          <option value="" disabled selected>Select quantity</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      <h5>Pickup Window end:</h5>
      <input
        type="date"
        value={formData.deadline}
        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <h5>Pickup Location:</h5>
      <input
        type="text"
        placeholder="Pickup Location"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
        />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
