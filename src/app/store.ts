import {TasksActionsType, tasksReducer } from '../features/TodolistsList/Todolist/Task/tasks-reducer';
import {TodolistsActionsType, todolistsReducer } from '../features/TodolistsList/Todolist/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistsActionsType | TasksActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;
