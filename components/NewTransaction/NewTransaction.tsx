"use client";

import style from "./NewTransaction.module.css";

// 1. (Opcional, mas recomendado) Definir o tipo de transação
export type TransactionType = "deposito" | "transferencia" | "";

// 2. Definir a interface de Props
export interface NewTransactionProps {
  /** O tipo de transação selecionado */
  type: TransactionType;
  /** O valor monetário da transação */
  valor: string;
  /** A descrição (opcional) da transação */
  descricao: string;
  /** Função chamada quando o tipo de transação muda */
  onTypeChange: (value: TransactionType) => void;
  /** Função chamada quando o valor muda */
  onValorChange: (value: string) => void;
  /** Função chamada quando a descrição muda */
  onDescricaoChange: (value: string) => void;
  /** Função chamada quando o botão de concluir é clicado */
  onSubmit: () => void;
  disabled?: boolean;
}

// 3. Remover 'useState' e receber as props
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
  // A sua lógica de validação continua aqui,
  // mas agora ela chama a prop 'onValorChange'
  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const apenasNumeros = e.target.value.replace(/[^0-9.,]/g, "");
    onValorChange(apenasNumeros);
  };

  return (
    <div className={style.NovaTransacao}>
      <h3>Nova transação</h3>

      {/* 4. Conectar todos os inputs às props */}
      <select
        value={type} // <-- Controlado pela prop 'type'
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
        value={valor} // <-- Controlado pela prop 'valor'
        onChange={handleValorChange}
        disabled={disabled}
      />

      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={descricao} // <-- Controlado pela prop 'descricao'
        onChange={(e) => onDescricaoChange(e.target.value)}
        disabled={disabled}
      />

      {/* 5. Chamar a prop 'onSubmit' no clique */}
      <button className={style.button} onClick={onSubmit} disabled={disabled}>
        Concluir transação
      </button>
    </div>
  );
}
