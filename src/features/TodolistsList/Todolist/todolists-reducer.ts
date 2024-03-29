import { todolistAPI } from "../../../api/todolist-api";
import { Dispatch } from "redux";
import {
    ApplicationActionsType,
    RequestStatusType,
    setAppStatusAC,
    SetAppStatusActionType,
} from "../../../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../../utils/error-utils";
import { fetchTasksTC, TodolistType } from "./Task/tasks-reducer";

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
    state: Array<TodolistDomainType> = initialState,
    action: TodolistsActionsType
): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter((tl) => tl.id !== action.id);
        case "ADD-TODOLIST":
            return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map((tl) => (tl.id === action.id ? { ...tl, title: action.title } : tl));
        case "CHANGE-TODOLIST-FILTER":
            return state.map((tl) => (tl.id === action.id ? { ...tl, filter: action.filter } : tl));
        case "SET-TODOLISTS":
            return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map((tl) => (tl.id === action.todolistId ? { ...tl, entityStatus: action.status } : tl));
        case "CLEAR-DATA":
            return [];
        default:
            return state;
    }
};

// actions
export const removeTodolistAC = (id: string) => ({ type: "REMOVE-TODOLIST", id } as const);
export const addTodolistAC = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist } as const);
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const);
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({ type: "CHANGE-TODOLIST-FILTER", id, filter } as const);
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: "SET-TODOLISTS", todolists } as const);
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
    ({ type: "CHANGE-TODOLIST-ENTITY-STATUS", todolistId, status } as const);
export const clearDataAC = () => ({ type: "CLEAR-DATA" } as const);

// thunks
export const fetchTodolistTC = (): any => (dispatch: Dispatch<TodolistsActionsType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
        .getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC("succeeded"));
            return res.data;
        })
        .then((todolists) => {
            todolists.forEach((t) => {
                dispatch(fetchTasksTC(t.id));
            });
        });
};
export const removeTodolistTC =
    (todolistId: string): any =>
    async (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC("loading"));
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
        let deleteTodolist = await todolistAPI.deleteTodolist(todolistId);
        try {
            if (deleteTodolist.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(deleteTodolist.data, dispatch);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
        }
    };
export const createTodolistTC =
    (title: string): any =>
    async (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC("loading"));
        let createTodolist = await todolistAPI.createTodolist(title);
        try {
            if (createTodolist.data.resultCode === 0) {
                const todolist = createTodolist.data.data.item;
                dispatch(addTodolistAC(todolist));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(createTodolist.data, dispatch);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
        }
    };
export const updateTodolistTitleTC =
    (todolistId: string, title: string): any =>
    async (dispatch: Dispatch<TodolistsActionsType>) => {
        dispatch(setAppStatusAC("loading"));
        let updateTodolist = await todolistAPI.updateTodolist(todolistId, title);
        try {
            if (updateTodolist.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(updateTodolist.data, dispatch);
            }
        } catch (e: any) {
            handleServerNetworkError(e, dispatch);
        }
    };

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatusAC>;
export type ClearDataActionType = ReturnType<typeof clearDataAC>;
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};
export type TodolistsActionsType =
    | AddTodolistActionType
    | SetTodolistsActionType
    | RemoveTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ClearDataActionType
    | SetAppStatusActionType
    | ApplicationActionsType
    | ChangeTodolistEntityStatusActionType;
