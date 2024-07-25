import { useState, useEffect } from 'react'
import Todo from './Todo';

const App = () => {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      try {
        const options = {
          method: "GET",
          // body: JSON.stringify({ todo: content }),
          headers: { "Content-Type": "application/json"},
        }
        const res = await fetch("/api/todos/", options);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const todos = await res.json();
        setTodos(todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    }
    getTodos();
  }, []);
  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

      setContent("");
      setTodos([...todos, newTodo]);
    }
  }
  // const createNewTodo = async (e) => {
  //   e.preventDefault();
  //   if (content.length > 3){
  //     const options = {
  //       method: "POST",
  //       body: JSON.stringify({ todo: content }),
  //       headers: { "Content-Type": "application/json"},
  //     }
  //     const res = await fetch("/api/todos", options);
  //     const newTodo = await res.json();
  //     setContent("");
  //     setTodos([...todos, newTodo]);
  //   };
  // }
  return (
    <div className='container'>
      <h1 className='title'>George's TODOLIST</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className='form_input' placeholder='Enter a new Todo...' required />
        <button type='submit' className='form_btn'>Create Todo</button>
      </form>
      <div className="todos"> 
        {
          (todos.length > 0) && todos.map((todo) => (<Todo key={todo._id} todo={todo} setTodos={setTodos} />))
        }
      </div>
    </div>
  )
}

export default App