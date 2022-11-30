import logo from "./logo.svg";
import "./App.css";
import TodoList from "./TodoList";
import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { render } from "@testing-library/react";

const LOCAL_STORAGE_TODO = "todosStorage.todos";
function App() {
  const [todos, setTodos] = useState([]);
  const todoInputRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODO));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODO, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function addTodo(e) {
    const name = todoInputRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuid(), name: name, complete: false }];
    });
  }

  function handleClearTodo() {
    
    const checkTodo = todos.filter((todo) => !todo.complete);
    setTodos(checkTodo);
  }
  return (
    
    <div className="container">
      <h1>Todo List</h1>
      <input ref={todoInputRef} type="text" />
      <div className="btn-container">
        <button type="add" onClick={addTodo}>Add Todo</button>
        <button type="clr" onClick={handleClearTodo}>Clear Todo</button>
      </div>
      <div>{todos.filter((todo) => !todo.complete).length} left Todo</div>
      <div className="todoList"><TodoList todos={todos} toggleTodo={toggleTodo} /></div>
    </div>
  );
}

export default App;
