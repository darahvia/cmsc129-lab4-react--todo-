import React from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onDelete, onEdit }) {
  const getPriorityClass = (priority) => {
    // Define classes for priority levels
    const priorityClasses = ['low', 'medium', 'high'];
    return priorityClasses[priority - 1] || ''; // Default to low if priority is invalid
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hours = parseInt(h);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formatted = (hours % 12 || 12) + ':' + m + ' ' + period;
    return formatted;
  };

  const formatDate = (date) => {  
    return new Date(task.added).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Function to get the color based on priority
  const getPriorityColor = (priority) => {
    const colors = ['#4CAF50', '#FF9800', '#F44336'];
    return colors[priority - 1] || '#4CAF50'; 
  };

  return (
    <div
      className={`task ${getPriorityClass(task.priority)}`}
      style={{ borderLeft: `5px solid ${getPriorityColor(task.priority)}` }}
      onClick={() => onEdit(task)}
    >
      <h3>
        {task.name} <button onClick={(e) => { e.stopPropagation(); onDelete(task); }}>×</button>
      </h3>
      <div className="details">
        Due: {formatDate(task.day)} {task.time && `• ${formatTime(task.time)}`}
      </div>
    </div>
  );
}
