import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id)} // Toggle task completion
      />
      {task.name}
      <button onClick={() => onDelete(task._id)}>Delete</button> {/* Delete task */}
    </li>
  );
};

export default TaskItem;
