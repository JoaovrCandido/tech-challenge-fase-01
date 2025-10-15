import { getTransactions } from "@/utils/transactions";
import { calculateBalance } from "@/utils/calculateBalance";
import { formatCurrency } from "@/utils/formatters";

export default async function TotalBalance() {
  const transactions = await getTransactions();
  const total = calculateBalance(transactions);
  //     const loadData = async () => {

  //       setTotal(soma);
  //     };

  //     loadData();
  //   }, []);

  return (
    <div>
      <p>{formatCurrency(total)}</p>
    </div>
  );
}
