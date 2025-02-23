export const getTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      return await response.json();
    } catch (err) {
      console.error('Error fetching tasks:', err);
      return [];
    }
  };
  
  export const addTask = async (task) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };
  
