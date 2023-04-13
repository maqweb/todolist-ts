import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import {AddItemForm} from './AddItemForm';

export default {
	title: 'Todolist/AddItemForm',
	component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const callback = action("Button was pressed");

const Template: ComponentStory<typeof AddItemForm> = (props) =>
	<AddItemForm addItem={callback} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
};


