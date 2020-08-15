import React from 'react'
import './Todo.css'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'


export default function Todo({ todo, toggleTodo, removeTodo }) {

    function handleTodoClick(){
        toggleTodo(todo.id)
    }

    function handleRemoveClick(){
        removeTodo(todo.id)
    }

    return (
        <div className="todoItem">
            <label className={todo.completed? 'completed' : '' }>
                <input type="checkbox" checked={todo.completed} onChange={handleTodoClick}/>
                <span>{todo.name}</span>
            </label>
            <DeleteOutlineIcon style={{ fontSize: 20 }} onClick={handleRemoveClick} />
        </div>
    )
}
