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
	useEffect(() => {
		todolistAPI.createTodolist('New todo 233')
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '9a843a85-1413-4229-996d-ec3d8120749e';
		todolistAPI.deleteTodolist(todolistId).then((res) => {
			setState(res.data)
		})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '9a843a85-1413-4229-996d-ec3d8120749e'
		todolistAPI.updateTodolist(todolistId, 'REACT>>>').then((res) => {
			setState(res.data)
		})
	}, [])

	return <div> {JSON.stringify(state)}</div>
}

