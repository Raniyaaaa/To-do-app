// pages/completed.js
import { useState, useEffect } from 'react';

const CompletedPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '32px',
        color: '#333',
        marginBottom: '20px',
      }}>Completed Tasks</h1>

      <div>
        {tasks.filter(task => task.completed).map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '4px',
            }}
          >
            <span style={{
              flex: '1',
              fontSize: '18px',
            }}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedPage;
