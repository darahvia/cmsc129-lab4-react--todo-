import React, { useState, useEffect } from 'react'
import './AddTask.css'

export default function AddTask({ onAddTask, onEditTask, taskToEdit }) {
  const [name, setName] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [priority, setPriority] = useState(0)

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name)
      setDay(taskToEdit.day)
      setTime(taskToEdit.time)
      setPriority(taskToEdit.priority)
    } else {
      clearForm()
    }
  }, [taskToEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTask = { name, day, time, priority, added: new Date().toISOString() }
    if (taskToEdit) {
      onEditTask({ ...taskToEdit, ...newTask })
    } else {
      onAddTask(newTask)
    }
    clearForm()
  }

  const clearForm = () => {
    setName('')
    setDay('')
    setTime('')
    setPriority(0)
  }

  const togglePriority = () => {
    setPriority(priority < 3 ? priority + 1 : 1)
  }

  const getPriorityLabel = (value) => ['Choose priority', 'Low', 'Medium', 'High'][value]
  const getPriorityMark = (value) => ['', '!', '!!', '!!!'][value]
  const getPriorityColor = (value) => ['#ccc', '#4CAF50', '#FF9800', '#F44336'][value]

  return (
    <form class = "add-form" onSubmit={handleSubmit} className="add-form">
      <div class="form-control">
        <label>Task</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Add Task" />
      </div>
      <div class="form-row">
      <div class="form-control">
        <label>Day</label>
        <input type="date" value={day} onChange={e => setDay(e.target.value)} />
      </div>
      <div class="form-control">
        <label>Time</label>
        <input type="time" value={time} onChange={e => setTime(e.target.value)} required />
      </div>
      </div>
      <div class="form-control priority-control">
        <label for="priority" style={{ color: getPriorityColor(priority) }}>{getPriorityLabel(priority)}</label>
        <button class="priority-btn" type="button" style={{ color: getPriorityColor(priority) }} onClick={togglePriority}>{getPriorityMark(priority)}</button>
      </div>
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  )
}