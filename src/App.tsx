import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterValueTypes = 'all' | 'active' | 'done'

function App() {

    let [tasks, setTask] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "graphQl", isDone: false },
        { id: 5, title: "Apollo", isDone: false },
        { id: 6, title: "Rest API", isDone: false }
    ])

    let [filter, setFilter] = useState<FilterValueTypes>('all')

    let tasksForTodolist = tasks

    function changeFilter(value: FilterValueTypes) {
        setFilter(value)
    }

    if (filter === 'done') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id != id)
        setTask(filteredTasks)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
