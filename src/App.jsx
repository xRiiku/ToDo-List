import './App.css';
import { useState } from 'react';
import trash from './assets/trash.svg'
import pencil from './assets/pencil.svg'
import { useLocalStorage } from './useLocalStorage';

export default function App() {
  // Utiliza el custom hook useLocalStorage para los estados task, allTasks, taskId y selected (Primer valor = Key, segundo valor = valor incial)
  const [task, setTask] = useLocalStorage('task', '');
  const [allTasks, setAllTasks] = useLocalStorage('allTasks', []);
  const [taskId, setTaskId] = useLocalStorage('taskId', 1);
  const [selected, setSelected] = useLocalStorage('selected', 'allTasks');
  const [editValue, setEditValue] = useState(''); //Estado para mostrar el valor anterior y posterior a la edición
  const [editingTaskId, setEditingTaskId] = useState(null); //Estado para identificar el id de la tarea que se está editando
  const [editing, setEditing] = useState(false); //Estado para identificar si se está editando una tarea o 

  const handleChange = (event) => {
    setTask(event.target.value);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleCheckBoxChange = (taskId) => {
    setAllTasks((allTasks) =>
      allTasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
        /* Recorremos el array y comprobamos en cada iteración si la tarea está marcada como completada o no. Si estaba marcada como completada, se marcará como no completada y viceversa*/
      )
    );
  };

  const deleteTask = (taskId) => {
    setAllTasks(allTasks.filter((task) => task.id !== taskId));
    /* El método filter() devuelve un nuevo array, en la cual excluimos la tarea con el id correspondiente al id que le pasamos por parámetro*/
  };

  const addTask = () => {
    if (task.trim() !== '') { //El método trim() elimina espacios en blanco. Si no hay ningún espacio en blanco, entonces añade la tarea
      const newTask = { id: taskId, name: task, isChecked: false };
      setAllTasks([...allTasks, newTask]);
      setTask('');
      setTaskId(taskId + 1);
    }
  };
  

  const editTask = (taskId, taskName) => {
    setEditingTaskId(taskId); //Estado para identificar la tarea que se está editando
    setEditValue(taskName); // muestra la tarea anterior como valor inicial en el input
    setEditing(true); // Estado para determinar si estamos editando la tarea o no.
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditValue('');
    setEditing(false);
  };

  const handleEditTask = () => {
    const updatedTasks = allTasks.map((task) =>
      task.id === editingTaskId ? { ...task, name: editValue } : task
      /* Comprobamos si la ID de la tarea coincide con la tarea que está editando actualmente (editingTaskId), si coincide, devuelve el objeto con la tarea anterior, con la opción de modificarlo / editarlo. Si el ID no coincide, devuelve la tarea sin cambios*/
    );
    setAllTasks(updatedTasks);
    cancelEditTask();
  };

  const renderTask = (task) => (
    <div key={task.id} className='task'>
      <input
        className={editing ? 'hideCheckBox' : ''}
        type="checkbox"
        checked={task.isChecked}
        onChange={() => handleCheckBoxChange(task.id)}
      />
      {task.id === editingTaskId && editing ? (
        <div className="editTaskInput">
          <input
            type="text"
            value={editValue}
            onChange={handleEditChange}
          />
          <button onClick={handleEditTask}>Add Task</button>
          <button onClick={cancelEditTask}>Cancel</button>
        </div>
      ) : (
        <span className={task.isChecked ? 'taskCompleted' : ''}>{task.name}</span>
      )}
      {/* Si la Id de la tarea coincide con la tarea que se está editando (editingTaskID) y además se está editando dicha tarea, entonces muestra un input con el valor de la tarea anterior el cual se puede modificar. Si no se está editando, muestra la tarea. */}

      <div className={editing ? 'hideCheckBox' : 'icons'}>
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
          onClick={() => editTask(task.id, task.name)}
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

  // Mover las tareas completadas al final de la lista
filteredTasks = [
  ...filteredTasks.filter((task) => !task.isChecked),
  ...filteredTasks.filter((task) => task.isChecked)
];

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
