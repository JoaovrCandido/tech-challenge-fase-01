import { formatDate, formatCurrency } from "@/utils/formatters";
import { getTransactions, sortTransactionsByDate } from "@/utils/transactions";
import { getMonthName } from "@/utils/getMonthName";


const TransactionsList = async () => {
  const transactions = await getTransactions();

  const sortedTransactions = sortTransactionsByDate(transactions);

  if (sortedTransactions.length === 0) {
    return <p>Nenhuma transação encontrada.</p>;
  }

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
