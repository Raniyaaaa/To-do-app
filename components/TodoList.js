import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { TiTickOutline, TiTick } from 'react-icons/ti';

const TodoList = ({ tasks: initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskText, setTaskText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = async () => {
    if (taskText.trim() !== '') {
      const newTask = { text: taskText, status: 'inComplete' };

      try {
        const res = await fetch('/api/task', {
          method: 'POST',
          body: JSON.stringify(newTask),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          const data = await res.json();
          setTasks([...tasks, { ...newTask, id: data.task._id }]);
          setTaskText('');
          setShowForm(false);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch('/api/task', {
        method: 'DELETE',
        body: JSON.stringify({ id: taskId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        setTasks(tasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleCompleted = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
  
    try {
      const res = await fetch('/api/task', {
        method: 'PUT',
        body: JSON.stringify({ id: taskId, status: 'completed', text: task.text }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, status: 'completed' } : task
          )
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };  

  const editTaskHandler = (taskId, currentText) => {
    setEditingTaskId(taskId);
    setEditingText(currentText);
  };

  const saveEditHandler = async () => {
    if (editingText.trim() !== '') {
      const task = tasks.find((t) => t.id === editingTaskId);
      
      if (!task) return;
  
      try {
        const res = await fetch('/api/task', {
          method: 'PUT',
          body: JSON.stringify({ 
            id: editingTaskId, 
            text: editingText, 
            status: task.status
          }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (res.ok) {
          setTasks(
            tasks.map((task) =>
              task.id === editingTaskId ? { ...task, text: editingText } : task
            )
          );
          setEditingTaskId(null);
          setEditingText('');
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };
  
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <FaPlus
        size={24}
        style={{
          display: 'block',
          margin: '0 auto 20px',
        }}
        onClick={() => setShowForm(!showForm)}
      />

      {showForm && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
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
          >
            Add Task
          </button>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {tasks
          .filter((task) => task.status !== 'completed')
          .map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                padding: '10px',
                margin: '10px 0',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
            >
              <span
                style={{
                  flex: '1',
                  fontSize: '18px',
                  color: '#555',
                  fontWeight: '500',
                }}
              >
                {editingTaskId === task.id ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      style={{
                        width: '80%',
                        padding: '5px',
                        borderRadius: '4px',
                        border: '1px solid #ddd',
                      }}
                    />
                    <TiTick
                      size={24}
                      style={{
                        cursor: 'pointer',
                        color: 'blue',
                        marginLeft: '10px',
                      }}
                      onClick={saveEditHandler}
                    />
                  </div>
                ) : (
                  task.text
                )}
              </span>
              <TiTickOutline
                size={24}
                style={{
                  marginRight: '20px',
                  cursor: 'pointer',
                  color: 'green',
                }}
                onClick={() => toggleCompleted(task.id)}
              />
              {editingTaskId === task.id ? null : (
                <BiEdit
                  size={20}
                  style={{
                    marginRight: '20px',
                    cursor: 'pointer',
                  }}
                  onClick={() => editTaskHandler(task.id, task.text)}
                />
              )}
              <RiDeleteBin2Fill
                size={20}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => deleteTask(task.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoList;
