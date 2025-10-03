import type { Meta, StoryObj } from "@storybook/react";

import { PokerCard } from "../components/PokerCard";

const meta = {
  component: PokerCard,
} satisfies Meta<typeof PokerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  args: {
    value: "5",
    selected: false,
    disabled: false,
    onClick: () => {},
    className: "",
    size: "md",
  },
};

export const Selected: Story = {
  args: {
    value: "5",
    selected: true,
    disabled: false,
    onClick: () => {},
    className: "",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    value: "5",
    selected: true,
    disabled: true,
    onClick: () => {},
    className: "",
    size: "md",
  },
};
