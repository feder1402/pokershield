import type { Meta, StoryObj } from "@storybook/react";
import { ConvergenceMap } from "../components/ConvergenceMap";

const meta = {
  component: ConvergenceMap,
} satisfies Meta<typeof ConvergenceMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValues: Story = {
  args: {
    values: [5, 8, 5, 3, 13],
  },
};
