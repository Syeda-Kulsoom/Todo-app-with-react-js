import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, newTask]);
    setNewTask('');
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveEditedTask = () => {
    if (editedTask.trim() === '') return;
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex ? editedTask : task
    );
    setTasks(updatedTasks);
    setEditIndex(-1);
    setEditedTask('');
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={removeAllTasks}>Delete All</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={saveEditedTask}>Save</button>
              </>
            ) : (
              <>
                {task}
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => removeTask(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
