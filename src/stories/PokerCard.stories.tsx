import type { Meta, StoryObj } from "@storybook/react";
import { fn } from 'storybook/test';
import { PokerCard } from "../components/PokerCard";
import { useState } from "react";

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
    onClick: fn(),
    className: "",
    size: "md",
  },
};

export const Selected: Story = {
  args: {
    value: "5",
    selected: true,
    disabled: false,
    onClick: fn(),
    className: "",
    size: "md",
  },
};

export const Disabled: Story = {
  args: {
    value: "5",
    selected: true,
    disabled: true,
    onClick: fn(),
    className: "",
    size: "md",
  },
};

export const FaceDown: Story = {
  args: {
    value: "5",
    selected: false,
    disabled: false,
    faceUp: false,
    onClick: fn(),
    className: "",
    size: "md",
  },
};

export const FlipAnimation: Story = {
  render: () => {
    const [faceUp, setFaceUp] = useState(true);

    return (
      <div className="flex flex-col items-center gap-4">
        <PokerCard
          value="5"
          faceUp={faceUp}
          onClick={() => setFaceUp(!faceUp)}
          size="md"
        />
        <button
          onClick={() => setFaceUp(!faceUp)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Toggle Flip (faceUp: {faceUp ? "true" : "false"})
        </button>
      </div>
    );
  },
};
