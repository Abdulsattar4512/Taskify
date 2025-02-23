import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async (taskName) => {
    const newTask = { name: taskName, completed: false };
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });
    const data = await response.json();
    setTasks([...tasks, data]);  // Update the list with the newly added task
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    const updatedTask = { ...task, completed: !task.completed };

    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    setTasks(tasks.map((t) => (t._id === taskId ? data : t))); // Update the task status in the list
  };

  const deleteTask = async (taskId) => {
    await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    setTasks(tasks.filter((task) => task._id !== taskId)); // Remove the task from the list
  };

  return (
    <div>
      <h1>Taskify - Your Task Management App</h1>
      <TaskForm onAddTask={addTask} />
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={toggleTaskCompletion}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
