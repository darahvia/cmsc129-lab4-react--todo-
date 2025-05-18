import React, { useState, useEffect } from 'react';
import AddTask from './components/AddTask/AddTask';
import TaskItem from './components/TaskItem/TaskItem';
import Footer from './components/Footer/Footer';
import './App.css'
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import db from './firebase'

export default function Tasks() {
  const PhoneFrame = ({ children }) => {
  return (
    <div style={{
      width: 375,          // iPhone X width in px
      height: 812,         // iPhone X height in px
      padding: 40,
      border: '16px solid black',
      borderRadius: 40,
      boxShadow: '0 0 30px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      margin: '20px auto',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {children}
    </div>
  )
}
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [sortOption, setSortOption] = useState('added');
  const tasksCollection = collection(db, 'tasks');


  const addTask = async (task) => {
    const docRef = await addDoc(tasksCollection, {
      ...task,
      added: new Date().toISOString()
    })
    setTasks(prev => [...prev, { id: docRef.id, ...task }])
    setShowAddTask(false)
  }


  const deleteTask = async (taskToDelete) => {
    await deleteDoc(doc(db, 'tasks', taskToDelete.id))
    setTasks(tasks.filter(t => t.id !== taskToDelete.id))
  }


  const editTask = (task) => {
    setSelectedTask(task);
    setShowAddTask(true);
  };

  const updateTask = async (updatedTask) => {
    const { id, ...rest } = updatedTask
    await updateDoc(doc(db, 'tasks', id), rest)
    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)))
    setSelectedTask(null)
    setShowAddTask(false)
  }


  const toggleAddTask = () => {
    if (showAddTask && selectedTask) setSelectedTask(null);
    setShowAddTask(!showAddTask);
  };

  const sortTasks = () => {
    const sortedTasks = [...tasks];
    if (sortOption === 'added') {
      sortedTasks.sort((a, b) => new Date(a.added).getTime() - new Date(b.added).getTime());
    } else if (sortOption === 'dueDate') {
      sortedTasks.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
    } else if (sortOption === 'priority') {
      sortedTasks.sort((a, b) => b.priority - a.priority);
    }
    return sortedTasks;
  };

  const groupedTasks = () => {
    const sortedTasks = sortTasks();
    if (sortOption === 'priority') {
      return [{ date: '', tasks: sortedTasks }];
    }

    const grouped = new Map();
    sortedTasks.forEach((task) => {
      const dateKey = sortOption === 'added' ? (task.added ? new Date(task.added).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '')
                                             : (task.day ? new Date(task.day).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '')
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)?.push(task);
    });

    return Array.from(grouped, ([date, tasks]) => ({ date, tasks }));
  };

useEffect(() => {
  const loadTasks = async () => {
    const snapshot = await getDocs(tasksCollection)
    const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setTasks(fetched)
  }
  loadTasks()
}, [])

  return (
    <PhoneFrame>
      <div className="tasks-container">
        <div>
          {showAddTask && (
            <AddTask onAddTask={addTask} onEditTask={updateTask} taskToEdit={selectedTask} />
          )}
        </div>
        <div>
          <label>Sort by:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="added">Date Added</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <div className="scrollable-tasks">
          <div className="date-label">
            {groupedTasks().map((group, index) => (
              <div key={index}>
                <h3>{group.date}</h3>
                {group.tasks.map(task => (
                  <TaskItem key={task.id} task={task} onDelete={deleteTask} onEdit={editTask} />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
              <Footer showAddTask={showAddTask} toggleAddTask={toggleAddTask} />

    </PhoneFrame>
  );
}
