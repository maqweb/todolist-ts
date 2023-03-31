import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReduxStoreProviderDecorator } from './ReduxStoreProviderDecorator';

import App from '../App';

export default {
	title: 'Todolist/App',
	component: App,
	decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (props) => <App />

export const AppExample = Template.bind({});
AppExample.args = {
};


