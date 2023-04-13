import {AddTodolistActionType, RemoveTodolistActionType} from '../todolists-reducer';
import {TasksType, todolistAPI, TodolistType, UpdateTaskModelType} from "../../../../api/todolist-api";
import {Dispatch} from 'redux';
import {AppRootStateType} from "../../../../app/store";
import {ApplicationActionsType, setAppErrorAC, setAppStatusAC} from "../../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TasksType) =>
    ({type: 'ADD-TASK', task} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', todolists} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TasksType>) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model} as const)

// thunks
export const fetchTasksTC = (todolistId: string): any => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTaskTC = (todolistId: string, title: string): any => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
            dispatch(setAppStatusAC('succeeded'))
            handleServerAppError(res.data, dispatch)
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string): any => (dispatch: Dispatch<TasksActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const updateTaskModelTC = (todolistId: string, taskId: string, model: UpdateTaskModelType): any =>
    (dispatch: Dispatch<TasksActionsType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const state = getState()
        const tasksForCurrentTodolist = state.tasks[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)

        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...model
        }
        if (task) {
            todolistAPI.updateTask(todolistId, taskId, apiModel)
                .then((res) => {
                    dispatch(updateTaskAC(todolistId, taskId, model))
                    dispatch(setAppStatusAC('succeeded'))
                    handleServerAppError(res.data, dispatch)
                })
                .catch((e) => {
                    handleServerNetworkError(e, dispatch)
                })
        }
    }

// types
export type TasksStateType = {
    [key: string]: Array<TasksType>
}

export type TasksActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof updateTaskAC>
    | ApplicationActionsType


