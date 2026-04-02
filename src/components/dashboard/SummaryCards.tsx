import { useFinance } from "@/context/FinanceContext";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

const cards = [
  { key: "balance", label: "Total Balance", icon: Wallet, colorClass: "text-primary" },
  { key: "income", label: "Total Income", icon: TrendingUp, colorClass: "text-income" },
  { key: "expenses", label: "Total Expenses", icon: TrendingDown, colorClass: "text-expense" },
  { key: "txnCount", label: "Transactions", icon: DollarSign, colorClass: "text-primary" },
] as const;

export default function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useFinance();

  const values: Record<string, string> = {
    balance: formatCurrency(totalBalance),
    income: formatCurrency(totalIncome),
    expenses: formatCurrency(totalExpenses),
    txnCount: transactions.length.toString(),
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={c.key}
          className="glass-card rounded-xl p-5 animate-slide-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">{c.label}</span>
            <c.icon className={`h-5 w-5 ${c.colorClass}`} />
          </div>
          <p className="text-2xl font-bold text-card-foreground">{values[c.key]}</p>
        </div>
      ))}
    </div>
  );
}
