import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import {Task} from '../Task';

export default {
	title: 'Todolist/Task',
	component: Task,
} as ComponentMeta<typeof Task>;

const changeStatusCallback = action("Status changed");
const removeTaskCallback = action("Remove task");
const updateTaskTitleCallback = action("Update task title");

const Template: ComponentStory<typeof Task> = (props) =>
	<>
		<Task
			changeTaskStatus={changeStatusCallback}
			removeTask={removeTaskCallback}
			changeTaskTitle={updateTaskTitleCallback}
			task={{ id: 'task1', title: 'qwe', isDone: true }}
			todolistId={'todolistId1'}
		/>
		<Task
			changeTaskStatus={changeStatusCallback}
			removeTask={removeTaskCallback}
			changeTaskTitle={updateTaskTitleCallback}
			task={{ id: 'task2', title: 'asd', isDone: false }}
			todolistId={'todolistId2'}
		/>
	</>

export const TaskExample = Template.bind({});
TaskExample.args = {
};


