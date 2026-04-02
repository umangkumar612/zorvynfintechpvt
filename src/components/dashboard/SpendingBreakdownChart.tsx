import { useMemo } from "react";
import { useFinance } from "@/context/FinanceContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "hsl(168,80%,36%)", "hsl(262,60%,55%)", "hsl(38,92%,50%)",
  "hsl(200,80%,50%)", "hsl(340,65%,55%)", "hsl(120,50%,45%)",
  "hsl(30,80%,55%)", "hsl(280,50%,50%)", "hsl(10,70%,50%)",
];

export default function SpendingBreakdownChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => map.set(t.category, (map.get(t.category) || 0) + t.amount));

    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="glass-card rounded-xl p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <h3 className="text-base font-semibold text-card-foreground mb-4">Spending Breakdown</h3>
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-10">No expense data</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              contentStyle={{
                backgroundColor: "hsl(0,0%,100%)",
                border: "1px solid hsl(220,13%,91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value) => <span className="text-muted-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
