import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import EditableSpan from './EditableSpan';

export default {
	title: 'Todolist/Editable Span',
	component: EditableSpan,
	argTypes: {
		onClick: {
			description: 'Change click',
		}
	}
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) =>
	<EditableSpan {...args} />

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
	value: 'qwe',
	onChange: action("Change click"),
};