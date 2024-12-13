import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/task');
      const data = await res.json();
      setTasks(data.tasks);
    };

    fetchTasks();
  }, []);

  const addTodo = async () => {
    if (taskText.trim() !== '') {
      const newTask = {
        text: taskText,
        status: 'inComplete',
      };

      const res = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok) {
        setTasks([...tasks, { ...newTask, _id: data.task._id }]);
        setTaskText('');
        setShowForm(false);
        
      } else {
        console.error('Error adding task:', data.error);
      }
    }
  };
  
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleCompleted = (taskId) => {
    setTasks(tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };

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
      }}>Todo List</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          display: 'block',
          margin: '0 auto',
          backgroundColor: '#4CAF50',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '50%',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        <FaPlus size={24} />
      </button>

      {showForm && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter a new task"
            style={{
              width: '80%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Add Task
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{
              flex: '1',
              fontSize: '18px',
            }}>
              {task.text}
            </span>
            <button
              onClick={() => toggleCompleted(task.id)}
              style={{
                padding: '6px 12px',
                border: 'none',
                backgroundColor: '#4CAF50',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              Complete
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                padding: '6px 12px',
                border: 'none',
                backgroundColor: '#f44336',
                color: 'white',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#e53935'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
