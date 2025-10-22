import type { Meta, StoryObj } from "@storybook/nextjs";
import BoxBalance from "./BoxBalance";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof BoxBalance> = {
  title: "Components/Home/BoxBalance",
  component: BoxBalance,
  tags: ["autodocs"],
  argTypes: {
    dateString: {
      control: "text",
      description: "Data formatada a ser exibida",
    },
    balance: {
      control: "text",
      description: "Valor do saldo",
    },
    defaultIsActive: {
      control: "boolean",
      description: "Define se o saldo começa visível ou não",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BoxBalance>;

export const Default: Story = {
  args: {
    dateString: "quarta-feira, 22/10/2025",
    balance: "R$ 1000,00",
    defaultIsActive: true,
  },
};

export const SaldoOculto: Story = {
  args: {
    ...Default.args, // Reutiliza os args da story Default
    defaultIsActive: false,
  },
};

// Story 3: Testando a interação de clique
export const InteracaoDeClique: Story = {
  args: {
    ...Default.args,
    defaultIsActive: true,
  },
  // A função 'play' simula interações do usuário
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const eyeIcon = await canvas.getByAltText("Esconder ou mostrar saldo");
    
    // Simula o primeiro clique (para esconder)
    await userEvent.click(eyeIcon);
    
    // Simula o segundo clique (para mostrar novamente)
    await userEvent.click(eyeIcon);
  },
};
