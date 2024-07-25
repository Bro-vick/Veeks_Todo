import { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./Todo";

// Set the base URL for all axios requests
axios.defaults.baseURL = "http://localhost:5000/api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function getTodos() {
      try {
        const res = await axios.get("/todos");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    getTodos();
  }, []);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      try {
        const res = await axios.post("/todos", { todo: content });
        setContent("");
        setTodos([...todos, res.data]);
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  }

  return (
    <main className="container">
      <h1 className="title">Veek Todos</h1>
      <form id="form" className="form" onSubmit={createNewTodo}>
        <input 
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter a new todo..."
          className="form_input"
          required 
        />
        <button className="form_btn" type="submit">Create Todo</button>
      </form>
      <div className="todos">
        {todos.length > 0 && todos.map((todo) => (
          <Todo key={todo._id} todo={todo} setTodos={setTodos} />
        ))}
      </div>
    </main>
  );
}
