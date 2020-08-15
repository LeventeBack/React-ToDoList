import React, { useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid';
import './app.css'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef =useRef()

  useEffect(() => {
    const  storedTodos =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e){
      e.preventDefault()
      const name = todoNameRef.current.value
      if(name === '') return 
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, completed: false}]
      })
      todoNameRef.current.value = null
  }

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  function removeTodo(id){
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  return (
    <div className="todoCard">
      <h1 className="todoTitle">TO DO LIST</h1>
      <p className="todoCounter">{todos.filter(todo => !todo.completed).length} left to do</p>
      
      <div className="todoList">
        <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo}/>
      </div>
      <form onSubmit={handleAddTodo} className="addTodoForm">
          <input ref={todoNameRef} type="text" />
          <button type="submit">+</button>
      </form>  
      <button onClick={handleClearTodos}>Clear Completed</button>
      
    </div>
  );
}

export default App;
