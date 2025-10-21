"use client";

import useSWR from 'swr';
import { Transaction } from "@/types";
import { getTransactions } from "@/utils/transactions";
import { calculateBalance } from "@/utils/calculateBalance";
import { formatCurrency } from "@/utils/formatters";
import Loading from '../Loading/Loading';

const fetcher = () => getTransactions();

export default function TotalBalance() {
  const { data: transactions, error } = useSWR<Transaction[]>('transactions', fetcher, {
      refreshInterval: 15000
  });

  if (error) return <div>Falha ao carregar...</div>;
  if (!transactions) return <Loading />;

  const total = calculateBalance(transactions);

  return (
    <div>
      <p>{formatCurrency(total)}</p>
    </div>
  );
}