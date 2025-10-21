import { getTransactions } from "@/utils/transactions";
import { calculateBalance } from "@/utils/calculateBalance";
import { formatCurrency } from "@/utils/formatters";
import style from "./TotalBance.module.css";

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
      <h3 className={style.showbalance}>{formatCurrency(total)}</h3>
    </div>
  );
}
