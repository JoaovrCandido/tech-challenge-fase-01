"use client";

import useSWR from "swr";
import { useState } from "react";
import { Transaction } from "@/types";
import { getTransactions } from "@/utils/transactions";
import { calculateBalance } from "@/utils/calculateBalance";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { getWeekday } from "@/utils/getWeekday";
import { TransactionType } from "@/types";
import SuccessModal from "@/components/SuccessModal/SuccessModal";

import BoxBalance from "@/components/BoxBalance/BoxBalance";
import Loading from "@/components/Loading/Loading";
import NewTransaction from "@/components/NewTransaction/NewTransaction";
import Menu from "@/components/Menu/Menu";

const fetcher = () => getTransactions();

export default function Home() {
  const [type, setType] = useState<TransactionType>("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Sucesso!");

  const { data: transactions, error } = useSWR<Transaction[]>(
    "transactions",
    fetcher,
    {
      refreshInterval: 15000,
    }
  );

  if (error) return <div>Falha ao carregar...</div>;
  if (!transactions) return <Loading />;

  const balance = calculateBalance(transactions);
  const formatedBalance = formatCurrency(balance);

  const today = new Date();
  const isoDate = today.toISOString();
  const weekday = getWeekday(isoDate);
  const formatted = formatDate(isoDate);
  const displayDate =
    weekday.charAt(0).toLowerCase() + weekday.slice(1) + ", " + formatted;

  const handleCreate = () => {
    setIsOpenModal(true);
    setModalTitle("Sucesso!!!")
    setModalMessage("Transação realizado com sucesso!");
  };

  const handleInvalidForm = () => {
    setIsOpenModal(true);
    setModalTitle("Erro!!!")
    setModalMessage("Por favor, preencha a transação!");
  };

  const handleSubmit = async () => {
    if (!type || !value) {
      handleInvalidForm();
      return;
    }

    setIsSubmitting(true);
    handleCreate();
    setType("");
    setValue("");
    setDescription("");
    console.log("Enviando dados para a API:", { type, value, description });
    setIsSubmitting(false);
  };

  return (
    <section>
      <BoxBalance balance={formatedBalance} dateString={displayDate} />

      <NewTransaction
        type={type}
        value={value}
        description={description}
        onTypeChange={setType}
        onValueChange={setValue}
        onDescriptionChange={setDescription}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />

      <Menu />

      <SuccessModal
        isOpen={isOpenModal}
        title={modalTitle}
        onClose={() => setIsOpenModal(false)}
        message={modalMessage}
      />
    </section>
  );
}
