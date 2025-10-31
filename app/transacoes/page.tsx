"use client";

import TransactionsContainer from "@/components/TransactionsContainer/TransactionsContainer";
import Menu from "@/components/Menu/Menu";

import { useIsMobile } from "@/hooks/useIsMobile";

import style from './transacoes.module.css';

export default function Transacoes() {
  const isMobile = useIsMobile();

  return (
    <section className={style.MExtrato}>
      {!isMobile && <Menu />}

      <div className={style.boxExtrato}>

      <TransactionsContainer />
      </div>
      
    </section>
  );
}
