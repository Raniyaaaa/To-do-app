// pages/completed.js
import { useState, useEffect } from 'react';

const CompletedPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      const res = await fetch('/api/task');
      const data = await res.json();
      setTasks(data.tasks.filter(task => task.status ==='completed'));
    };

    fetchCompletedTasks();
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
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
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
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No completed tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default CompletedPage;
