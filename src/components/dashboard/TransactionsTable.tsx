import { useFinance } from "@/context/FinanceContext";
import { allCategories } from "@/data/mockData";
import { Search, ArrowUpDown, Trash2 } from "lucide-react";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function TransactionsTable() {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();

  return (
    <div className="glass-card rounded-xl p-5 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h3 className="text-base font-semibold text-card-foreground mb-4">Transactions</h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <select
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value as any }))}
          className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as any }))}
          className="px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Categories</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          onClick={() =>
            setFilters((f) => ({
              ...f,
              sortOrder: f.sortOrder === "asc" ? "desc" : "asc",
            }))
          }
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-input bg-background text-sm text-foreground hover:bg-secondary transition-colors"
        >
          <ArrowUpDown className="h-4 w-4" />
          {filters.sortOrder === "asc" ? "Oldest" : "Newest"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Description</th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">Category</th>
                <th className="text-right py-3 px-2 font-medium text-muted-foreground">Amount</th>
                {role === "admin" && (
                  <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.slice(0, 20).map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                  <td className="py-3 px-2 text-muted-foreground">
                    {new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </td>
                  <td className="py-3 px-2 font-medium text-card-foreground">{t.description}</td>
                  <td className="py-3 px-2">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {t.category}
                    </span>
                  </td>
                  <td className={`py-3 px-2 text-right font-semibold ${t.type === "income" ? "text-income" : "text-expense"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredTransactions.length > 20 && (
          <p className="text-center text-xs text-muted-foreground mt-3">
            Showing 20 of {filteredTransactions.length} transactions
          </p>
        )}
      </div>
    </div>
  );
}
