"use client";

import Image from "next/image";
import style from "./Header.module.css";

import alterarfonte from "@/public/alterarfonte.png";
import modoclaroescuro from "@/public/modoclaroescuro.png";

export interface HeaderProps {
  title: string;
  onToggleFontSize: () => void;
  onToggleDarkMode: () => void;
}

export default function Header({
  title,
  onToggleFontSize,
  onToggleDarkMode,
}: HeaderProps) {
  return (
    <header className={style.header}>
      <h1>{title}</h1>
      <div className={style.acessibilidade}>
        <button
          className={style.buttonIcon}
          onClick={onToggleFontSize}
          aria-label="Alterar tamanho da fonte"
        >
          <Image
            className={style.tamanhofonte}
            src={alterarfonte}
            width={35}
            height={35}
            alt=""
          />
        </button>

        <button
          className={style.buttonIcon}
          onClick={onToggleDarkMode}
          aria-label="Alternar modo claro ou escuro"
        >
          <Image
            className={style.claroescuro}
            src={modoclaroescuro}
            width={40}
            height={40}
            alt=""
          />
        </button>
      </div>
    </header>
  );
}
