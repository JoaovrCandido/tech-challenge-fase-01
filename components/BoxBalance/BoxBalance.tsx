"use client";

import React, { useState, useEffect } from "react";

import olhofechado from "../../public/olhofechado.png";
import olhoaberto from "../../public/olhoaberto.png";

import Image from "next/image";

import style from "./BoxBalance.module.css";

export interface BoxBalanceProps {
  /** A data formatada para ser exibida */
  dateString: string;
  /** O valor do saldo. Se for `undefined`, mostramos o loading. */
  balance?: string;
  /** Estado inicial da visibilidade do saldo */
  defaultIsActive?: boolean;
}


export default function BoxBalance({
  dateString,
  balance,
  defaultIsActive = true,
}: BoxBalanceProps) {
  const [isActive, setIsActive] = useState<boolean>(defaultIsActive);

  useEffect(() => {
    // Se a prop 'defaultIsActive' mudar,
    // force o estado 'isActive' a ter o mesmo valor.
    setIsActive(defaultIsActive);
  }, [defaultIsActive]);

  return (
    <div className={style.boxSaldo}>
      <h2 className={style.boasvindas}>Seja bem-vindo(a)!</h2>
      <p className={style.data} id="dataAtual">{dateString}</p>
      <div className={style.saldo}>
        <div className={style.saldoeolho}>
          <h4 className={style.conta}>Saldo</h4>

          <Image
            className={style.imgolho}
            src={isActive ? olhoaberto : olhofechado}
            width={35}
            height={35}
            alt="Esconder ou mostrar saldo"
            onClick={() => setIsActive(!isActive)}
          />
        </div>

        <p className={style.currentAccount}>Conta Corrente</p>

        {isActive ? <h3>{balance}</h3> : <h3>R$ ••••••</h3>}
      </div>
    </div>
  );
}
