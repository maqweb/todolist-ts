import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValueTypes = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTask] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "graphQl", isDone: false },
        { id: v1(), title: "Apollo", isDone: false },
        { id: v1(), title: "Rest API", isDone: false }
    ])

    let [filter, setFilter] = useState<FilterValueTypes>('all')

    let tasksForTodolist = tasks

    function changeFilter(value: FilterValueTypes) {
        setFilter(value)
    }

    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    function addTask(title: string) {
        let task = { id: v1(), title, isDone: false }
        let newTasks = [task, ...tasks]
        setTask(newTasks)
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTask(filteredTasks)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
