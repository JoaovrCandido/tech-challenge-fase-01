import { Transaction } from "@/types";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { getMonthName } from "@/utils/getMonthName";
import { AdjustTypesNames } from "@/utils/adjustTypesName";
import Image from "next/image";
import { usePathname } from "next/navigation";

import editImage from "@/public/edit.png";
import deleteImage from "@/public/delete-icon.png";

import style from "./TransactionsList.module.css";

interface TransactionsListProps {
  transactions: Transaction[];

  onEditClick: (transaction: Transaction) => void;
  onDeleteClick: (transation: Transaction) => void;
}

const TransactionsList = ({
  transactions,
  onEditClick,
  onDeleteClick
}: TransactionsListProps) => {

  const pathname = usePathname();
  const isHome = pathname === "/";

  if (transactions.length === 0) {
    return <p>Nenhuma transação encontrada.</p>;
  }

  return (
    <div className={isHome ? style.transactionsListHome : style.transactionsList}>
      {transactions.map((transaction) => {
        return (
          <div key={transaction.id} className={style.transactionItem}>
            <div className={style.transactionHeader}>
              <h3 className={style.transactionMonth}>
                {getMonthName(transaction.date)}
              </h3>

              {!isHome && (
                <div className={style.transactionActions}>
                  <button
                    className={style.transactionEdit}
                    onClick={() => onEditClick(transaction)}
                    aria-label={`Editar transação ${transaction.description || ""
                      }`}
                  >
                    <Image
                      className={style.image}
                      src={editImage}
                      width={16}
                      height={16}
                      alt="Imagem para editar transação"
                    />
                  </button>

                  <button
                    className={style.transactionDelete}
                    onClick={() => onDeleteClick(transaction)}
                    aria-label={`Excluir transação ${transaction.description || ""
                      }`}
                  >
                    <Image
                      className={style.image}
                      src={deleteImage}
                      width={16}
                      height={16}
                      alt="Imagem para editar transação"
                    />
                  </button>
                </div>
              )}
            </div>
            <div className={style.transactionInfo}>
              <p className={style.transactionType}>
                {AdjustTypesNames(transaction.type)}
              </p>
              <p className={style.transactionDate}>
                {formatDate(transaction.date)}
              </p>
            </div>
            <div className={style.transactionValueAndDesc}>
              <p className={style.transactionDesc}>
                {transaction.description || ""}
              </p>
              <p className={style.transactionValue}>
                {formatCurrency(transaction.value)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsList;
