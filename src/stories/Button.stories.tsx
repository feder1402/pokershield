// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { Button } from '../components/ui/button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => <><Button {...args} >Click me</Button></>,
  args: {
    variant: 'default',
    size: 'lg',
    onClick: fn(),
  },
};