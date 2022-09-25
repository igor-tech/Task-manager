import React from 'react';

type TodolistType = {
    title: string
    tasks: Array<{id: number, title: string, isDone:boolean}>
}

export function Todolist({title,tasks}: TodolistType) {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t => <li key={t.id}><input type={'checkbox'} checked={t.isDone}/><span>{t.title}</span></li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}