import type { Meta, StoryObj } from "@storybook/react";
import { fn } from 'storybook/test';

import { EstimationCardSelector } from "../pages/RoomPage/EstimationCardSelector";
import { EstimationScaleIds } from "@/lib/estimation-scales";

const meta = {
  component: EstimationCardSelector,
  argTypes: {
    scale: {
      options: EstimationScaleIds,
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof EstimationCardSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    enabled: true,
    scale: "fibonacci",
    votedValue: "5",
    onVote: fn(),
  },
};

export const Disabled: Story = {
  args: {
    enabled: false,
    scale: "fibonacci",
    votedValue: "5",
    onVote: fn(),
  },
};
