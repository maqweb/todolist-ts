import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    let [tasks, setTask] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "graphQl", isDone: false },
        { id: 5, title: "Apollo", isDone: false },
        { id: 6, title: "Rest API", isDone: false }
    ])

    function removeTask(id: number) {
        tasks = tasks.filter(t => t.id != id)
        setTask(tasks)
    }


    return (
        <div className="App">
            <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
        </div>
    );
}

export default App;
