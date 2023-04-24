import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setInitializedAC} from '../../app/app-reducer'
import {authAPI, LoginType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType): any => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    let login = await authAPI.login(data)
    try {
        if (login.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(login.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const initializeAppTC = (): any => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    let authMe = await authAPI.me()
    try {
        if (authMe.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(authMe.data, dispatch)
        }
        dispatch(setInitializedAC(true))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const logoutTC = (): any => async (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    let logout = await authAPI.logout()
    try {
        if (logout.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(logout.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}


// types
type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
