import React from 'react';
import { FaCheckSquare, FaRegSquare, FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';

// Set the base URL for all axios requests
axios.defaults.baseURL = "http://localhost:5000/api";

const Todo = (props) => {
  const { todo, setTodos } = props;

  const updateTodo = async (todoId, todoStatus) => {
    try {
      const res = await axios.put(`/todos/${todoId}`, { status: todoStatus });
      if (res.data.acknowledged) {
        setTodos(currentTodos => {
          return currentTodos.map((currentTodo) => {
            if (currentTodo._id === todoId) {
              return { ...currentTodo, status: !currentTodo.status };
            }
            return currentTodo;
          });
        });
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const res = await axios.delete(`/todos/${todoId}`);
      if (res.data.acknowledged) {
        setTodos(currentTodos => {
          return currentTodos.filter((currentTodo) => currentTodo._id !== todoId);
        });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  return (
    <div className='todo'>
      <p>{todo.todo}</p>
      <div className="mutations">
        <button className='todo__status' onClick={() => updateTodo(todo._id, todo.status)}>
          {todo.status ? <FaCheckSquare /> : <FaRegSquare />}
        </button>
        <button className='todo__delete' onClick={() => deleteTodo(todo._id)}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  )
}

export default Todo;
