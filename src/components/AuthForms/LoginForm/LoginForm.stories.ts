import type { Meta, StoryObj } from "@storybook/react";

import LoginForm from "./LoginForm";

const meta = {
    title: "AuthForms/LoginForm",
    component: LoginForm,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {},
    args: {}
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};