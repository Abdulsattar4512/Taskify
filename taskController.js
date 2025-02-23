const Task = require('../models/task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      name: req.body.name,
      completed: false
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};

  

