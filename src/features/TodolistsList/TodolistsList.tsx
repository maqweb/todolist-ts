import React, {useCallback, useEffect} from "react";
import {
    changeTodolistFilterAC,
    createTodolistTC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodolistTc,
    TodolistDomainType,
    updateTodolistTitleTC
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskModelTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";

export const TodolistsList: React.FC = () => {

    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title));
    }, []);

    const changeStatus = useCallback(function (todolistId: string, taskId: string, status: TaskStatuses,) {
        dispatch(updateTaskModelTC(todolistId, taskId, {status}));
    }, []);

    const changeTaskTitle = useCallback(function (todolistId: string, taskId: string, title: string,) {
        dispatch(updateTaskModelTC(todolistId, taskId, {title}));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTc(id))
    }, []);

    const changeTodolistTitle = useCallback(function (todolistId: string, title: string) {
        dispatch(updateTodolistTitleTC(todolistId, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch]);


    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}