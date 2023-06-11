import './App.css';
import { useState } from 'react';
import trash from './assets/trash.svg'
import pencil from './assets/pencil.svg'

export default function App() {
  const [task, setTask] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [selected, setSelected] = useState('allTasks');
  const [editValue, setEditValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleCheckBoxChange = (taskId) => {
    setAllTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setAllTasks(allTasks.filter((task) => task.id !== taskId));
  };

  const addTask = () => {
    const newTask = { id: taskId, name: task, isChecked: false };
    setAllTasks([...allTasks, newTask]);
    setTask('');
    setTaskId(taskId + 1);
  };

  const editTask = (taskId) => {
    setEditingTaskId(taskId);
    setEditValue('');
  };

  const renderTask = (task) => (
    <div key={task.id} className='task'>
      <input
        type="checkbox"
        checked={task.isChecked}
        onChange={() => handleCheckBoxChange(task.id)}
      />
      {task.id === editingTaskId ? (
        <div className="editTaskInput">
          <input
            type="text"
            value={editValue}
            onChange={handleEditChange}
          />
          <button onClick={handleEditTask}>Edit Task</button>
        </div>
      ) : (
        <span>{task.name}</span>
      )}


      <div className='icons'>
        <img
          className='trash'
          src={trash}
          alt='trash'
          onClick={() => deleteTask(task.id)}
        />
        <img
          className='pencil'
          src={pencil}
          alt='pencil'
          onClick={() => editTask(task.id)}
        />
      </div>
    </div>
  );

  let filteredTasks = allTasks;
  if (selected === 'Completed') {
    filteredTasks = allTasks.filter((task) => task.isChecked);
  } else if (selected === 'Uncompleted') {
    filteredTasks = allTasks.filter((task) => !task.isChecked);
  }

  const handleEditTask = () => {
    const updatedTasks = allTasks.map((task) =>
      task.id === editingTaskId ? { ...task, name: editValue } : task
    );
    setAllTasks(updatedTasks);
    setEditingTaskId(null);
    setEditValue('');
  };

  return (
    <div className='parent'>
      <h1>TO-DO List</h1>
      <div className='menu'>
        <div className='addTask'>
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Write your task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className='selector'>
          <select onChange={event => setSelected(event.target.value)}>
            <option value='allTasks'>All tasks</option>
            <option value='Completed'>Completed</option>
            <option value='Uncompleted'>Uncompleted</option>
          </select>
        </div>
      </div>

      <div className='taskContainer'>
        <div className='tasks'>
          {filteredTasks.map((task) => renderTask(task))}
        </div>
      </div>
    </div>
  )
}