"use client";

import { useState } from "react";
import style from "./NewTransaction.module.css";

export default function NewTransaction() {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/[^0-9.,]/g, "");
    setValor(apenasNumeros);
  };

  return (
    <div className={style.NovaTransacao}>
      <h3>Nova transação</h3>

      <select defaultValue="">
        <option value="" disabled>
          Selecione o tipo de transação
        </option>
        <option value="deposito">Depósito</option>
        <option value="transferencia">Transferência</option>
      </select>

      <input
        type="text"
        placeholder="00,00"
        value={valor}
        onChange={handleValorChange}
      />

      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <button className={style.button}>Concluir transação</button>
    </div>
  );
}
