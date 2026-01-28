import { useState } from 'react';
import { useTasks, useCompleteTask, useDeleteTask } from '../hooks/useTasks';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = () => {
  const [statusFilter, setStatusFilter] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const { data: tasks, isLoading, error } = useTasks(statusFilter);
  const completeTask = useCompleteTask();
  const deleteTask = useDeleteTask();

  const handleComplete = async (id) => {
    try {
      await completeTask.mutateAsync(id);
    } catch (error) {
      alert('Failed to complete task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask.mutateAsync(id);
      } catch (error) {
        alert('Failed to delete task');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return '#10b981';
      case 'IN_PROGRESS':
        return '#3b82f6';
      case 'CANCELLED':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (error) {
    return <div className="error">Error loading tasks: {error.message}</div>;
  }

  return (
    <div className="task-list-container">
      <div className="header">
        <h1>Task Manager</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + New Task
        </button>
      </div>

      <div className="filters">
        <button
          className={`filter-btn ${statusFilter === null ? 'active' : ''}`}
          onClick={() => setStatusFilter(null)}
        >
          All
        </button>
        <button
          className={`filter-btn ${statusFilter === 'PENDING' ? 'active' : ''}`}
          onClick={() => setStatusFilter('PENDING')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${statusFilter === 'IN_PROGRESS' ? 'active' : ''}`}
          onClick={() => setStatusFilter('IN_PROGRESS')}
        >
          In Progress
        </button>
        <button
          className={`filter-btn ${statusFilter === 'COMPLETED' ? 'active' : ''}`}
          onClick={() => setStatusFilter('COMPLETED')}
        >
          Completed
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onClose={handleFormClose}
        />
      )}

      <div className="tasks-grid">
        {tasks?.length === 0 ? (
          <div className="no-tasks">No tasks found. Create your first task!</div>
        ) : (
          tasks?.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <h3>{task.title}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(task.status) }}
                >
                  {task.status.replace('_', ' ')}
                </span>
              </div>

              <p className="task-description">{task.description || 'No description'}</p>

              <div className="task-meta">
                <div className="meta-item">
                  <strong>Due:</strong> {formatDate(task.dueDate)}
                </div>
                <div className="meta-item">
                  <strong>Created:</strong> {formatDate(task.createdAt)}
                </div>
              </div>

              <div className="task-actions">
                {task.status !== 'COMPLETED' && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleComplete(task.id)}
                    disabled={completeTask.isPending}
                  >
                    ✓ Complete
                  </button>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(task.id)}
                  disabled={deleteTask.isPending}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;