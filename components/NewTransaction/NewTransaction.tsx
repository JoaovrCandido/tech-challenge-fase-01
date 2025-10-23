"use client";

import style from "./NewTransaction.module.css";

export type TransactionType = "deposito" | "transferencia" | "";

export interface NewTransactionProps {
  type: TransactionType;
  valor: string;
  descricao: string;
  onTypeChange: (value: TransactionType) => void;
  onValorChange: (value: string) => void;
  onDescricaoChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function NewTransaction({
  type,
  valor,
  descricao,
  onTypeChange,
  onValorChange,
  onDescricaoChange,
  onSubmit,
  disabled = false,
}: NewTransactionProps) {
  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/[^0-9.,]/g, "");
    onValorChange(apenasNumeros);
  };

  return (
    <div className={style.NovaTransacao}>
      <h3>Nova transação</h3>

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value as TransactionType)}
        disabled={disabled}
      >
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
        disabled={disabled}
      />

      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao}
        onChange={(e) => onDescricaoChange(e.target.value)}
        disabled={disabled}
      />

      <button className={style.button} onClick={onSubmit} disabled={disabled}>
        Concluir transação
      </button>
    </div>
  );
}
