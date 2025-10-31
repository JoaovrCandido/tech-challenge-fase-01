import type { Meta, StoryObj } from "@storybook/nextjs";
import DeleteTransaction from "./DeleteTransaction";

const meta: Meta<typeof DeleteTransaction> = {
    title: "Componentes/DeleteTransaction",
    component: DeleteTransaction,
    tags: ["autodocs"],
    argTypes: {
        title: { control: "text"}
    }
}

export default meta;
type Story = StoryObj<typeof DeleteTransaction>;

export const Default: Story = {
    args: {
        title: "Deseja realmente deletar a transação?"
    }
}