"use client";

import useSWR, { mutate } from "swr";
import { useState } from "react";

import Link from "next/link";

import { Transaction } from "@/types";
import { TransactionType } from "@/types";

import { getTransactions, createTransaction } from "@/lib/api";

import { calculateBalance } from "@/utils/calculateBalance";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { getWeekday } from "@/utils/getWeekday";

import { useIsMobile } from "@/hooks/useIsMobile";

import SuccessModal from "@/components/SuccessModal/SuccessModal";
import BoxBalance from "@/components/BoxBalance/BoxBalance";
import Loading from "@/components/Loading/Loading";
import NewTransaction from "@/components/NewTransaction/NewTransaction";
import Menu from "@/components/Menu/Menu";
import TransactionsContainer from "@/components/TransactionsContainer/TransactionsContainer";

import style from "./home.module.css";

const fetcher = () => getTransactions();

export default function Home() {
  const [type, setType] = useState<TransactionType>("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Sucesso!");

  const isMobile = useIsMobile();

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
    setModalTitle("Sucesso!!!");
    setModalMessage("Transação realizado com sucesso!");
  };

  const handleInvalidForm = () => {
    setIsOpenModal(true);
    setModalTitle("Erro!!!");
    setModalMessage("Por favor, preencha a transação!");
  };

  const handleRequestError = () => {
    setIsOpenModal(true);
    setModalTitle("Erro!!!");
    setModalMessage("Erro ao enviar a transação!");
  };

  const handleSubmit = async () => {
    if (!type || !value || value <= "0") {
      handleInvalidForm();
      return;
    }

    const newTransaction = {
      type,
      amount: Number(value),
      description,
    };

    setIsSubmitting(true);
    console.log("Enviando dados para a API:", { type, value, description });

    try {
      const created = await createTransaction(newTransaction);

      console.log("transação criada: ", created);

      mutate("transactions");

      setType("");
      setValue("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao enviar a transação:", error);
      handleRequestError();
    } finally {
      handleCreate();
      setIsSubmitting(false);
    }
  };

  return (
    <div className={style.layout}>
      {!isMobile && <Menu />}

      <div className={style.mainContent}>
        <BoxBalance balance={formatedBalance} dateString={displayDate} />

        <NewTransaction
          title="Nova transação"
          type={type}
          value={value}
          description={description}
          onTypeChange={setType}
          onValueChange={setValue}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          disabled={isSubmitting}
        />
      </div>

      {(
        <Link href="/transacoes">
          <aside className={style.transactionsPanel}>

            <h2>Extrato</h2>

            <TransactionsContainer />
          </aside>
        </Link>
      )}

      <SuccessModal
        isOpen={isOpenModal}
        title={modalTitle}
        onClose={() => setIsOpenModal(false)}
        message={modalMessage}
      />
      </div>
  );
}
