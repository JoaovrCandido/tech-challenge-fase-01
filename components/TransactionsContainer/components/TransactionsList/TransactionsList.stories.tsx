import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";

import TransactionsList from "./TransactionsList";
import Modal from "@/components/Modal/Modal";
import NewTransaction from "@/components/NewTransaction/NewTransaction";
import SuccessModal from "@/components/SuccessModal/SuccessModal";

import { Transaction, TransactionType } from "@/types";

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: new Date("2023-10-25T14:30:00Z").toISOString(),
    type: "deposito",
    value: 1500.75,
    description: "Salário",
  },
  {
    id: 2,
    date: new Date("2023-10-24T10:15:00Z").toISOString(),
    type: "transferencia",
    value: 250.0,
    description: "Pagamento Aluguel",
  },
];

const meta: Meta<typeof TransactionsList> = {
  title: "Components/Transacoes/TransactionsList",
  component: TransactionsList,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

export const Default: Story = {
  args: {
    transactions: mockTransactions,
    onEditClick: noop,
  },
};

export const Empty: Story = {
  args: {
    transactions: [],
    onEditClick: noop,
  },
};

export const WithEditModal: Story = {
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
      useState<Transaction | null>(null);
    const [editType, setEditType] = useState<TransactionType>("deposito");
    const [editValue, setEditValue] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [isModalSucessOpen, setIsModalSucessOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("Sucesso!");

    const handleEdited = () => {
      setIsModalSucessOpen(true);
      setModalTitle("Sucesso!!!");
      setModalMessage("Transação editada com sucesso!");
    };

    const handleEditClick = (transaction: Transaction) => {
      setSelectedTransaction(transaction);
      setEditType(transaction.type);
      setEditValue(String(transaction.value));
      setEditDescription(transaction.description || "");
      setIsModalOpen(true);

      console.log("Storybook: Botão 'Editar' clicado", transaction);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedTransaction(null);
    };

    const handleEditSubmit = () => {
      const formData = {
        id: selectedTransaction?.id,
        type: editType,
        value: editValue,
        description: editDescription,
      };

      console.log("Storybook: Formulário 'Submitado'", formData);

      handleCloseModal();

      handleEdited();
    };

    return (
      <>
        <div style={{ paddingBottom: "20px", borderBottom: "1px solid #ccc" }}>
          <p>Esta história simula o container.</p>
          <p>Clique em Editar em um item da lista abaixo para abrir o modal.</p>
        </div>

        <TransactionsList
          transactions={mockTransactions}
          onEditClick={handleEditClick}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <NewTransaction
            title="Editar Transação (Storybook)"
            type={editType}
            value={editValue}
            description={editDescription}
            onTypeChange={(type) => {
              setEditType(type);
              console.log("Storybook: Campo alterado", {
                field: "type",
                value: type,
              });
            }}
            onValueChange={(val) => {
              setEditValue(val);
              console.log("Storybook: Campo alterado", {
                field: "value",
                value: val,
              });
            }}
            onDescriptionChange={(desc) => {
              setEditDescription(desc);
              console.log("Storybook: Campo alterado", {
                field: "description",
                value: desc,
              });
            }}
            onSubmit={handleEditSubmit}
            disabled={false}
          />
        </Modal>

        <SuccessModal
          isOpen={isModalSucessOpen}
          title={modalTitle}
          onClose={() => setIsModalSucessOpen(false)}
          message={modalMessage}
        />
      </>
    );
  },
};
