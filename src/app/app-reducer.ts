import { Dispatch } from "redux";
import { authAPI } from "../api/todolist-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ErrorType = any;

const initialState = {
    status: "loading" as RequestStatusType,
    error: null as ErrorType,
    initialized: false as boolean,
};

type InitialStateType = typeof initialState;

export const appReducer = (
    state: InitialStateType = initialState,
    action: ApplicationActionsType
): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return { ...state, status: action.status };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        case "APP/SET-INITIALIZED":
            return { ...state, initialized: action.value };
        default:
            return state;
    }
};

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const);
export const setAppErrorAC = (error: ErrorType) => ({ type: "APP/SET-ERROR", error } as const);
export const setInitializedAC = (value: boolean) => ({ type: "APP/SET-INITIALIZED", value } as const);

// thunk
export const initializeAppTC = (): any => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    let authMe = await authAPI.me();
    try {
        if (authMe.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(authMe.data, dispatch);
        }
        dispatch(setInitializedAC(true));
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
    }
};

// types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetInitializedActionType = ReturnType<typeof setInitializedAC>;
export type ApplicationActionsType = SetAppStatusActionType | SetAppErrorActionType | SetInitializedActionType;
