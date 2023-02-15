import { createContext, ReactNode, useEffect, useState } from "react";

interface TransactionProps {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}
interface TransactionContextType {
  transactions: TransactionProps[];
}
interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  async function loadTransaction() {
    const response = await fetch('http://localhost:3333/transactions')
    setTransactions(await response.json());
  }

  useEffect(() => {
    loadTransaction();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}