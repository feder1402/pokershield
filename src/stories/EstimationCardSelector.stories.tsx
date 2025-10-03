import type { Meta, StoryObj } from "@storybook/react";

import { VotingCards } from "../pages/RoomPage/VotingCards";

const meta = {
  component: VotingCards,
} satisfies Meta<typeof VotingCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    enabled: true,
    onVote: () => {},
    selectedValue: "5",
  },
};

export const Disabled: Story = {
  args: {
    enabled: false,
    onVote: () => {},
    selectedValue: "5",
  },
};
