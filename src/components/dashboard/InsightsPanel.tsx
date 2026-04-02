import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { TrendingUp, TrendingDown, BarChart3, Lightbulb } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function InsightsPanel() {
  const { transactions, totalIncome, totalExpenses } = useFinance();

  const insights = useMemo(() => {
    // Highest spending category
    const catMap = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => catMap.set(t.category, (catMap.get(t.category) || 0) + t.amount));

    const sorted = Array.from(catMap.entries()).sort((a, b) => b[1] - a[1]);
    const topCategory = sorted[0];

    // Monthly comparison (current vs previous)
    const now = new Date();
    const curMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonth = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;

    const curExpense = transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(curMonth))
      .reduce((s, t) => s + t.amount, 0);
    const prevExpense = transactions
      .filter((t) => t.type === "expense" && t.date.startsWith(prevMonth))
      .reduce((s, t) => s + t.amount, 0);

    const monthlyChange = prevExpense > 0 ? ((curExpense - prevExpense) / prevExpense) * 100 : 0;

    // Savings rate
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    // Average transaction
    const avgExpense =
      transactions.filter((t) => t.type === "expense").length > 0
        ? totalExpenses / transactions.filter((t) => t.type === "expense").length
        : 0;

    return { topCategory, monthlyChange, curExpense, prevExpense, savingsRate, avgExpense };
  }, [transactions, totalIncome, totalExpenses]);

  const cards = [
    {
      icon: TrendingDown,
      label: "Top Spending Category",
      value: insights.topCategory ? insights.topCategory[0] : "N/A",
      sub: insights.topCategory ? formatCurrency(insights.topCategory[1]) : "",
      color: "text-expense",
    },
    {
      icon: BarChart3,
      label: "Monthly Change",
      value: `${insights.monthlyChange >= 0 ? "+" : ""}${insights.monthlyChange.toFixed(1)}%`,
      sub: `${formatCurrency(insights.curExpense)} this month`,
      color: insights.monthlyChange > 0 ? "text-expense" : "text-income",
    },
    {
      icon: TrendingUp,
      label: "Savings Rate",
      value: `${insights.savingsRate.toFixed(1)}%`,
      sub: "of income saved",
      color: insights.savingsRate > 20 ? "text-income" : "text-warning",
    },
    {
      icon: Lightbulb,
      label: "Avg. Expense",
      value: formatCurrency(insights.avgExpense),
      sub: "per transaction",
      color: "text-primary",
    },
  ];

  return (
    <div className="glass-card rounded-xl p-5 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <h3 className="text-base font-semibold text-card-foreground mb-4">Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
            <div className={`p-2 rounded-lg bg-background ${c.color}`}>
              <c.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{c.label}</p>
              <p className={`text-lg font-bold ${c.color}`}>{c.value}</p>
              <p className="text-xs text-muted-foreground">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
