import type { Metadata } from "next";
import TransactionsContainer from "@/components/TransactionsContainer/TransactionsContainer";

import style from './transacoes.module.css';

export const metadata: Metadata = {
  title: "Transações",
  description: "Transações - Projeto Financeiro",
};

export default function Transacoes() {
  return (
    <section>
      <h1 className={style.title}>Extrato</h1>

      <TransactionsContainer />
    </section>
  );
}
