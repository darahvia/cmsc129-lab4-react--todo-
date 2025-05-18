import React from 'react'
import './Footer.css'

export default function Footer({ showAddTask, toggleAddTask }) {
  return (
    <div>
      <button class="footer-container" onClick={toggleAddTask}>{showAddTask ? '✓' : '+'}</button>
    </div>
  )
}