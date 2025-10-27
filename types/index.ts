export type TransactionType = "deposito" | "transferencia" | "";

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

export interface NewTransactionProps {
  title: string;
  type: TransactionType;
  value: string;
  description?: string;
  onTypeChange: (value: TransactionType) => void;
  onValueChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export interface BoxBalanceProps {
  dateString: string;
  balance?: string;
  defaultIsActive?: boolean;
}

export type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  title?: string;
};

export interface HeaderProps {
  title: string;
  onToggleFontSize: () => void;
  onToggleDarkMode: () => void;
}

export interface AccessibilityContextType {
  theme: "light" | "dark";
  fontLevel: 0 | 1 | 2;
  toggleDarkMode: () => void;
  toggleChangeFontSize: () => void;
}