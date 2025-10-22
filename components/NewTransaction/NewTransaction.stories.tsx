// NewTransaction.stories.tsx

import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react"; 
import NewTransaction, { TransactionType } from "./NewTransaction";

// 1. 'action' FOI REMOVIDO
// import { action } from '@storybook/addon-actions'; 

import { userEvent, within } from "@storybook/testing-library";

// 2. Crie uma função 'helper' para substituir o 'action'
//    Isso vai logar no console (F12) do seu navegador
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logAction = (name: string) => (...args: any[]) => {
  console.log(`[Storybook Action] ${name}`, ...args);
};

const meta: Meta<typeof NewTransaction> = {
  title: "Components/Home/NewTransaction",
  component: NewTransaction,
  tags: ['autodocs'],
  
  // 3. Atualize o argTypes. Em vez de 'action',
  //    vamos 'desabilitar' eles da tabela de controles
  //    (pois não são props visuais).
  argTypes: {
    onTypeChange: { table: { disable: true } },
    onValorChange: { table: { disable: true } },
    onDescricaoChange: { table: { disable: true } },
    onSubmit: { table: { disable: true } },
    disabled: { control: 'boolean' },
  },
  
  // 4. Atualize os 'args' para usar a nova função 'logAction'
  args: {
    onTypeChange: logAction('onTypeChange'),
    onValorChange: logAction('onValorChange'),
    onDescricaoChange: logAction('onDescricaoChange'),
    onSubmit: logAction('onSubmit'),
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof NewTransaction>;

// ----------------------------------------------------
// Story 1: Default (Interativa)
// ----------------------------------------------------
export const Default: Story = {
  render: (args) => {
    const [type, setType] = useState<TransactionType>("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");

    // A função que o componente vai chamar (com 0 argumentos)
    const handleSubmit = () => {
      // ----- CORREÇÃO AQUI -----

      // 1. Logue os dados manualmente no console.
      //    (Isto é o que você queria fazer)
      console.log("[Storybook Submit Data]", { type, valor, descricao });

      // 2. Chame o spy 'onSubmit' (o logAction) da forma correta:
      //    com 0 argumentos, apenas para registrar que foi chamado.
      args.onSubmit(); // <-- Erro corrigido

      // 3. Limpe os campos
      setType("");
      setValor("");
      setDescricao("");
    };

    return (
      <NewTransaction
        {...args} // Passa 'disabled' e os 'on...Change' spies
        
        type={type}
        valor={valor}
        descricao={descricao}
        
        // Passa os setters de estado
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

        // Passa o *nosso* handleSubmit, que faz o log e limpa.
        onSubmit={handleSubmit}
      />
    );
  },
};

// ----------------------------------------------------
// Story 2: Estado desabilitado (enviando)
// ----------------------------------------------------
export const Disabled: Story = {
  args: {
    type: "deposito",
    valor: "1.250,00",
    descricao: "Enviando dados...",
    disabled: true,
  },
};

// ----------------------------------------------------
// Story 3: Teste de preenchimento
// ----------------------------------------------------
export const PreenchendoFormulario: Story = {
  // O 'play' também NÃO MUDA NADA
  ...Default, 
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByRole('combobox');
    const valueInput = canvas.getByPlaceholderText('00,00');
    const descInput = canvas.getByPlaceholderText('Descrição (opcional)');
    const submitButton = canvas.getByRole('button', { name: /concluir transação/i });

    await userEvent.selectOptions(select, 'deposito');
    await userEvent.type(valueInput, '250,50');
    await userEvent.type(descInput, 'Pagamento da fatura');
    
    await userEvent.click(submitButton);
    // O clique vai disparar o 'logAction'
  },
};