import type { Metadata } from "next";
import TransactionsList from "@/components/TransactionsList/TransactionsList";

import style from './transacoes.module.css';

export const metadata: Metadata = {
  title: "Transações",
  description: "Transações - Projeto Financeiro",
};

export default function Transacoes() {
  return (
    <section>
      <h1 className={style.title}>Transações</h1>
      <br />
      <TransactionsList />
    </section>
  );
}
