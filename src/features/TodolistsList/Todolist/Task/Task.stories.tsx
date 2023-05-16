import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Task } from "./Task";
import { TaskStatuses } from "./tasks-reducer";

export default {
    title: "Todolist/Task",
    component: Task,
} as ComponentMeta<typeof Task>;

const changeStatusCallback = action("Status changed");
const removeTaskCallback = action("Remove task");
const updateTaskTitleCallback = action("Update task title");
const entityStatusLoading = "loading";
const entityStatus = "idle";

const Template: ComponentStory<typeof Task> = (props) => (
    <>
        <Task
            changeTaskStatus={changeStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={updateTaskTitleCallback}
            task={{
                id: "task1",
                title: "qwe",
                status: TaskStatuses.Completed,
                description: "",
                addedDate: 0,
                order: 0,
                startDate: "",
                completed: false,
                todoListId: "todoListId1",
                priority: 0,
                deadline: "",
            }}
            todolistId={"todolistId1"}
            entityStatus={entityStatusLoading}
        />
        <Task
            changeTaskStatus={changeStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={updateTaskTitleCallback}
            task={{
                id: "task2",
                title: "asd",
                status: TaskStatuses.New,
                description: "",
                addedDate: 0,
                order: 0,
                startDate: "",
                completed: false,
                todoListId: "todoListId2",
                priority: 0,
                deadline: "",
            }}
            todolistId={"todolistId2"}
            entityStatus={entityStatus}
        />
    </>
);

export const TaskExample = Template.bind({});
TaskExample.args = {};
