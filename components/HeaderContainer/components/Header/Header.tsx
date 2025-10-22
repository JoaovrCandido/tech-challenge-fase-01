"use client";

import Image from "next/image";
import style from "./Header.module.css";

import alterarfonte from "@/public/alterarfonte.png";
import modoclaroescuro from "@/public/modoclaroescuro.png";

// 1. Defina as props que o componente vai receber
export interface HeaderProps {
  /**
   * O título principal a ser exibido no header.
   */
  title: string;
  /**
   * Função a ser chamada quando o botão de acessibilidade de fonte for clicado.
   */
  onToggleFontSize: () => void;
  /**
   * Função a ser chamada quando o botão de tema (claro/escuro) for clicado.
   */
  onToggleDarkMode: () => void;
}

export default function Header({
  title,
  onToggleFontSize,
  onToggleDarkMode,
}: HeaderProps) {
  return (
    <header className={style.header}>
      {/* 3. Use a prop 'title' em vez de texto fixo */}
      <h1>{title}</h1>
      <div className={style.acessibilidade}>
        {/* BÔNUS DE ACESSIBILIDADE ♿:
          Imagens clicáveis DEVEM estar dentro de um <button> 
          para serem acessíveis via teclado e leitores de tela.
        */}
        <button
          className={style.buttonIcon} // Crie um estilo para resetar o botão
          onClick={onToggleFontSize}
          aria-label="Alterar tamanho da fonte"
        >
          <Image
            className={style.tamanhofonte}
            src={alterarfonte}
            width={35}
            height={35}
            alt="" // O alt fica no aria-label do botão
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
            alt="" // O alt fica no aria-label do botão
          />
        </button>
      </div>
    </header>
  );
}
