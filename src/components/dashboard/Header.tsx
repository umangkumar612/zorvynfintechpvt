import { useFinance } from "@/context/FinanceContext";
import { Moon, Sun, Shield, Eye } from "lucide-react";
import AddTransactionDialog from "./AddTransactionDialog";

export default function Header() {
  const { role, setRole, darkMode, toggleDarkMode } = useFinance();

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Track your financial activity at a glance</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <AddTransactionDialog />

        {/* Role Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
          <button
            onClick={() => setRole("admin")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              role === "admin" ? "bg-primary text-primary-foreground" : "text-secondary-foreground hover:bg-accent"
            }`}
          >
            <Shield className="h-3.5 w-3.5" /> Admin
          </button>
          <button
            onClick={() => setRole("viewer")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              role === "viewer" ? "bg-primary text-primary-foreground" : "text-secondary-foreground hover:bg-accent"
            }`}
          >
            <Eye className="h-3.5 w-3.5" /> Viewer
          </button>
        </div>

        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
