import React, { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
	title: 'API'
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistAPI.getTodolists().then((res) => {
			setState(res.data)
		})
	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	const [title, setTitle] = useState<any>('')
	const createTodolist = () => {
		todolistAPI.createTodolist(title)
			.then((res) => {
				setState(res.data)
			})
	}
	return <>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input type="text" placeholder={'Todolist title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
			<button onClick={createTodolist}>Create todolist</button>
		</div>
	</>
}

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<any>('')
	const deleteTodolist = () => {
		todolistAPI.deleteTodolist(todolistId).then((res) => {
			setState(res.data)
		})
	}
	return <>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input type="text" placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
			<button onClick={deleteTodolist}>Delete todolist</button>
		</div>
	</>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	const [title, setTitle] = useState('')
	const [todolistId, setTodolistId] = useState<any>('')
	const updateTodolistTitle = () => {
		todolistAPI.updateTodolist(todolistId, title).then((res) => {
			setState(res.data)
		})
	}
	return <>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input type="text" placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
			<input type="text" placeholder={'Todolist title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
			<button onClick={updateTodolistTitle}>Update todolist title</button>
		</div>
	</>
}

export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<any>('')
	const getTasks = () => {
		todolistAPI.getTasks(todolistId).then((res) => {
			setState(res.data)
		})
	}
	return <>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input type="text" placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
			<button onClick={getTasks}>Get tasks</button>
		</div>
	</>
}

export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	const [title, setTitle] = useState('')
	const [todolistId, setTodolistId] = useState('')
	const createTask = () => {
		todolistAPI.createTask(todolistId, title).then((res) => {
			setState(res.data)
		})
	}
	return <>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input type="text" placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
			<input type="text" placeholder={'Task title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
			<button onClick={createTask}>Create task</button>
		</div>
	</>
}

export const DeleteTask = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState('')
	const [taskId, setTaskId] = useState<any>('')

	const deleteTask = () => {
		todolistAPI.deleteTask(todolistId, taskId).then((res) => {
			setState(res.data)
		})
	}
	return <>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input type="text" placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
			<input type="text" placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
			<button onClick={deleteTask}>Delete task</button>
		</div>
	</>
}

export const UpdateTask = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>('')
	const [taskId, setTaskId] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [status, setStatus] = useState<number>(0)
	const [priority, setPriority] = useState<number>(0)
	const [startDate, setStartDate] = useState<string>('')
	const [deadline, setDeadline] = useState<string>('')

	const updateTask = () => {
		todolistAPI.updateTask(todolistId, taskId, {
			title,
			deadline,
			description,
			status,
			priority,
			startDate,
		}).then((res) => {
			setState(res.data)
		})
	}
	return <>
		<div>{JSON.stringify(state)}</div>
		<div>
			<input type="text" placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
			<input type="text" placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
			<input type="text" placeholder={'description'} value={description} onChange={e => setDescription(e.currentTarget.value)}/>
			<input type="number" placeholder={'status'} value={status} onChange={e => setStatus(+e.currentTarget.value)}/>
			<input type="number" placeholder={'priority'} value={priority} onChange={e => setPriority(+e.currentTarget.value)}/>
			<button onClick={updateTask}>Update task</button>
		</div>
	</>
}

