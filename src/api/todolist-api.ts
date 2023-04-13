import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': '6ab52400-1718-48c6-9e57-f24fa6232ed9'
	},
})

// api
export const todolistAPI = {
	getTodolists() {
		return instance.get<Array<TodolistType>>(`todo-lists/`)
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists/`, {title: title})
	},
	deleteTodolist(todolistId: string) {
		return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
	},
	updateTodolist(todolistId: string, title: string) {
		return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title})
	},
	getTasks(todolistId: string) {
		return instance.get<any>(`todo-lists/${todolistId}/tasks`)
	},
	createTask(todolistId: string, title: string) {
		return instance.post<ResponseType<{item: TasksType}>>(`todo-lists/${todolistId}/tasks`, {title})
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
	},
}

// types
export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}
export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}
export type ResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	fieldsErrors: Array<string>
	data: D
}
export type UpdateTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}
export type TasksType = {
	description: string
	title: string
	completed: boolean
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: number
}

