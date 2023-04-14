import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {AppRootStateType} from '../app/store'
import {tasksReducer, TaskStatuses} from '../features/TodolistsList/Todolist/Task/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer'


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS',
                status: TaskStatuses.New,
                startDate: '',
                todoListId: 'todolistId2',
                order: 0,
                deadline: '',
                addedDate: 0,
                completed: false,
                priority: 0,
                description: ''
            },
            {
                id: v1(), title: 'JS',
                status: TaskStatuses.New,
                startDate: '',
                todoListId: 'todolistId2',
                order: 0,
                deadline: '',
                addedDate: 0,
                completed: false,
                priority: 0,
                description: ''
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Rest API',
                status: TaskStatuses.New,
                startDate: '',
                todoListId: 'todolistId2',
                order: 0,
                deadline: '',
                addedDate: 0,
                completed: false,
                priority: 0,
                description: ''
            },
            {
                id: v1(), title: 'React Book',
                status: TaskStatuses.New,
                startDate: '',
                todoListId: 'todolistId2',
                order: 0,
                deadline: '',
                addedDate: 0,
                completed: false,
                priority: 0,
                description: ''
            }
        ]
    },
    app: {
        status: "loading",
        error: false
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
