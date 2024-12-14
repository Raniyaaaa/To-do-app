import { useEffect, useState } from 'react';

const CompletedTasks = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        textAlign: 'center',
        fontSize: '36px',
        color: '#333',
        marginBottom: '30px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
      }}>
        Completed Tasks
      </h1>
      <div style={{ padding: '0 15px' }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                backgroundColor: '#fff',
                padding: '15px',
                marginBottom: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'transform 0.2s ease',
              }}
            >
              <span style={{
                flex: '1',
                fontSize: '18px',
                color: '#555',
                fontWeight: '500',
              }}>
                {task.text}
              </span>
              <span style={{
                fontSize: '14px',
                color: '#4CAF50',
                fontWeight: '600',
              }}>
                Completed
              </span>
            </div>
          ))
        ) : (
          <p style={{
            textAlign: 'center',
            fontSize: '18px',
            color: '#999',
            fontStyle: 'italic',
          }}>
            No completed tasks available.
          </p>
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
