"use client";

import useSWR from "swr";
import { useState } from "react";
import { Transaction } from "@/types";
import { getTransactions } from "@/utils/transactions";
import { calculateBalance } from "@/utils/calculateBalance";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { getWeekday } from "@/utils/getWeekday";
import { TransactionType } from "@/components/NewTransaction/NewTransaction";

import BoxBalance from "@/components/BoxBalance/BoxBalance";
import Loading from "@/components/Loading/Loading";
import NewTransaction from "@/components/NewTransaction/NewTransaction";
import Menu from "@/components/Menu/Menu";

const fetcher = () => getTransactions();

export default function Home() {
  const [type, setType] = useState<TransactionType>("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    if (!type || !valor) {
      alert("Por favor, preencha o tipo e o valor.");
      return;
    }

    setIsSubmitting(true);
    alert("Transação realizada");
    setType("");
    setValor("");
    setDescricao("");
    console.log("Enviando dados para a API:", { type, valor, descricao });
    setIsSubmitting(false);
  };

  return (
    <section>
      <BoxBalance balance={formatedBalance} dateString={displayDate} />

      <NewTransaction
        type={type}
        valor={valor}
        descricao={descricao}
        // Passe as funções 'set' como 'handlers' de mudança
        onTypeChange={setType}
        onValorChange={setValor}
        onDescricaoChange={setDescricao}
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      />

      <Menu />
    </section>
  );
}
