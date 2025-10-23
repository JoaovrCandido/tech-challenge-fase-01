import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import NewTransaction, { TransactionType } from "./NewTransaction";

import { userEvent, within } from "@storybook/testing-library";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logAction = (name: string) => (...args: any[]) => {
    console.log(`[Storybook Action] ${name}`, ...args);
  };

const meta: Meta<typeof NewTransaction> = {
  title: "Components/Home/NewTransaction",
  component: NewTransaction,
  tags: ["autodocs"],

  argTypes: {
    onTypeChange: { table: { disable: true } },
    onValorChange: { table: { disable: true } },
    onDescricaoChange: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
    disabled: { control: "boolean" },
  },

  args: {
    onTypeChange: logAction("onTypeChange"),
    onValorChange: logAction("onValorChange"),
    onDescricaoChange: logAction("onDescricaoChange"),
    onSubmit: logAction("onSubmit"),
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof NewTransaction>;

export const Default: Story = {
  render: (args) => {
    const [type, setType] = useState<TransactionType>("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");

    const handleSubmit = () => {
      console.log("[Storybook Submit Data]", { type, valor, descricao });

      args.onSubmit();

      setType("");
      setValor("");
      setDescricao("");
    };

    return (
      <NewTransaction
        {...args}
        type={type}
        valor={valor}
        descricao={descricao}
        onTypeChange={(value) => {
          setType(value);
          args.onTypeChange(value);
        }}
        onValorChange={(value) => {
          setValor(value);
          args.onValorChange(value);
        }}
        onDescricaoChange={(value) => {
          setDescricao(value);
          args.onDescricaoChange(value);
        }}
        onSubmit={handleSubmit}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    type: "deposito",
    valor: "1.250,00",
    descricao: "Enviando dados...",
    disabled: true,
  },
};

export const PreenchendoFormulario: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole("combobox");
    const valueInput = canvas.getByPlaceholderText("00,00");
    const descInput = canvas.getByPlaceholderText("Descrição (opcional)");
    const submitButton = canvas.getByRole("button", {
      name: /concluir transação/i,
    });

    await userEvent.selectOptions(select, "deposito");
    await userEvent.type(valueInput, "250,50");
    await userEvent.type(descInput, "Pagamento da fatura");

    await userEvent.click(submitButton);
  },
};
