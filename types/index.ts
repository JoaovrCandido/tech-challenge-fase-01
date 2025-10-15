export type TransactionType = 'deposito' | 'transferencia';

export interface Transaction {
  id: number;
  type: TransactionType;
  value: number;
  date: string; // Formato "AAAA-MM-DD"
  description: string;
}

export interface TransactionInput {
  type: TransactionType;
  amount: number;
  description?: string;
}

export interface Database {
  transaction: Transaction[];
}