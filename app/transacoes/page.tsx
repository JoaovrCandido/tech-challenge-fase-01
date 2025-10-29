import type { Metadata } from "next";
import TransactionsContainer from "@/components/TransactionsContainer/TransactionsContainer";
import Menu from "@/components/Menu/Menu";

import style from './transacoes.module.css';

export const metadata: Metadata = {
  title: "Transações",
  description: "Transações - Projeto Financeiro",
};

export default function Transacoes() {
  return (
    <section className={style.MExtrato}>
      <Menu />

      <div className={style.boxExtrato}>
        <h1 className={style.title}>Extrato</h1>

      <TransactionsContainer />
      </div>
      
    </section>
  );
}
