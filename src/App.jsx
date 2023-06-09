import './App.css';
import { useState } from 'react';
import trash from './assets/trash.svg'

export default function App() {
  const [task, setTask] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [taskId, setTaskId] = useState(1);
  const [selected, setSelected] = useState('allTasks')

  const handleChange = (event) => {
    setTask(event.target.value);
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
  {selected === 'allTasks'
    ? allTasks.map((task) => (
        <div key={task.id} className='task'>
          <input
            type="checkbox"
            checked={task.isChecked}
            onChange={() => handleCheckBoxChange(task.id)}
          />
          {task.name}

          <div>
            <img
              className='trash'
              src={trash}
              alt='trash'
              onClick={() => deleteTask(task.id)}
            />
          </div>
        </div>
      ))
    : selected === 'Completed'
    ? allTasks
        .filter((task) => task.isChecked)
        .map((task) => (
          <div key={task.id} className='task'>
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => handleCheckBoxChange(task.id)}
            />
            {task.name}

            <div>
              <img
                className='trash'
                src={trash}
                alt='trash'
                onClick={() => deleteTask(task.id)}
              />
            </div>
          </div>
        ))
    : selected === 'Uncompleted'
    ? allTasks
        .filter((task) => task.isChecked === false)
        .map((task) => (
          <div key={task.id} className='task'>
            <input
              type="checkbox"
              checked={task.isChecked}
              onChange={() => handleCheckBoxChange(task.id)}
            />
            {task.name}

            <div>
              <img
                className='trash'
                src={trash}
                alt='trash'
                onClick={() => deleteTask(task.id)}
              />
            </div>
          </div>
        ))
    : null}
</div>

      </div>
    </div>
  )
}  