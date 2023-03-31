import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'
	},
})

export const todolistAPI = {
	getTodolists() {
		const promise = instance.get<any>(`todo-lists/`)
		return promise
	},

	createTodolist(title: string) {
		const promise = instance.post<any>(`todo-lists/`, { title: title })
		return promise
	},

	deleteTodolist(todolistId: string) {
		const promise = instance.delete<any>(`todo-lists/${todolistId}`)
		return promise
	},

	updateTodolist(todolistId: string, title: string) {
		const promise = instance.put<any>(`todo-lists/${todolistId}`, { title: title })
		return promise
	},
}

