import React, { useState, useEffect } from 'react';
import './App.css';

function Header() {
  return <h1>Todo List</h1>
};

function Todo({todo, index, toggleTodo, removeTodo}) {
  return <div 
  style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }} 
  className="todo">
    <div>
      <input className="check" type="checkbox" onClick={() => toggleTodo(index)} /> 
    </div>
      {todo.text}
    <div>
      <button className="btn .btn:hover" onClick={() => removeTodo(index)}>x</button>
    </div>
    </div>
};

function TodoForm({addTodo}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return;
    addTodo(value)
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
       type="text" 
       className="input" 
       placeholder="Add Todo..."
       value={value}
       onChange={e => setValue(e.target.value)} />
    </form>
  )
};

function App() {
  const [todos, setTodos] =useState([
    {
      text: 'Learn about React',
      incomplete: false
    },
    {
      text: 'Meet Friend for lunch',
      incomplete: false
    },
    {
      text: 'Build really cool todo app',
      incomplete: false
    }
  ]);
  const Local_Storage_Key = 'todoApp.todos';

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(Local_Storage_Key));
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(Local_Storage_Key, JSON.stringify(todos))
  }, [todos])

  const addTodo = text => {
    const newTodos = [...todos, {text}];
    setTodos(newTodos);
  };

  const toggleTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
        <Todo 
        key={index} 
        index={index} 
        todo={todo}
        toggleTodo={toggleTodo} 
        removeTodo={removeTodo}
        />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
      <div className="leftTodo" >
        { todos.filter(todo => !todo.isCompleted).length } left to do
      </div>
    </div>
  )
 };

export default App;
