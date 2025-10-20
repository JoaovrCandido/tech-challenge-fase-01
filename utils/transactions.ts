import { Transaction } from "@/types";

export async function getTransactions(): Promise<Transaction[]> {
  const apiUrl = 'http://localhost:3000';
  
  const response = await fetch(`${apiUrl}/api/transactions`, {
    cache: 'no-store', 
  });

  if (!response.ok) {
    console.error("Falha ao buscar transações");
    throw new Error('Falha ao buscar transações')
  }

  return response.json();
}

export const sortTransactionsByDate = (transactions: Transaction[]): Transaction[] => {
  return [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};