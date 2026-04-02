import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function BalanceTrendChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const monthMap = new Map<string, { income: number; expense: number }>();

    transactions.forEach((t) => {
      const month = t.date.slice(0, 7); // YYYY-MM
      const entry = monthMap.get(month) || { income: 0, expense: 0 };
      if (t.type === "income") entry.income += t.amount;
      else entry.expense += t.amount;
      monthMap.set(month, entry);
    });

    return Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, v]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
        income: Math.round(v.income),
        expense: Math.round(v.expense),
        net: Math.round(v.income - v.expense),
      }));
  }, [transactions]);

  return (
    <div className="glass-card rounded-xl p-5 animate-slide-up" style={{ animationDelay: "100ms" }}>
      <h3 className="text-base font-semibold text-card-foreground mb-4">Balance Trend</h3>
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-10">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0,72%,51%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0,72%,51%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0,0%,100%)",
                border: "1px solid hsl(220,13%,91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Area type="monotone" dataKey="income" stroke="hsl(160,84%,39%)" fill="url(#incomeGrad)" strokeWidth={2} name="Income" />
            <Area type="monotone" dataKey="expense" stroke="hsl(0,72%,51%)" fill="url(#expenseGrad)" strokeWidth={2} name="Expenses" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
