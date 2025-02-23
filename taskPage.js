// In TaskPage.js
import React, { useState, useEffect } from 'react';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const toggleTaskCompletion = (taskId) => {
    fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(updatedTask => {
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      });
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task._id)}
            />
            {task.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
