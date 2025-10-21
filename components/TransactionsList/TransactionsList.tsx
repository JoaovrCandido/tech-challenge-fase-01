"use client";

import useSWR from 'swr';
import { Transaction } from "@/types";
import { formatDate, formatCurrency } from "@/utils/formatters";
import { getTransactions, sortTransactionsByDate } from "@/utils/transactions";
import { getMonthName } from "@/utils/getMonthName";
import Loading from '../Loading/Loading';


const fetcher = () => getTransactions();

const TransactionsList = () => {
  const { data: transactions, error, isLoading } = useSWR<Transaction[]>('transactions', fetcher, {
      refreshInterval: 15000
  });

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <p>Ocorreu um erro ao buscar as transações.</p>;
  }
  
  if (!transactions || transactions.length === 0) {
    return <p>Nenhuma transação encontrada.</p>;
  }

  const sortedTransactions = sortTransactionsByDate(transactions);

  return (
    <div>
      <div>
        {sortedTransactions.map((transaction) => {
          return (
            <div key={transaction.id}>
              <h3>{getMonthName(transaction.date)}</h3>

              <div>
                <p>{transaction.type}</p>
                <p>{formatDate(transaction.date)}</p>
              </div>
              <div>
                <p>{transaction.description || "Sem descrição"}</p>
                <p>{formatCurrency(transaction.value)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionsList;