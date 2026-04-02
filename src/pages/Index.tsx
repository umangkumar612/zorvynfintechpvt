import { FinanceProvider } from "@/context/FinanceContext";
import Header from "@/components/dashboard/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdownChart from "@/components/dashboard/SpendingBreakdownChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsPanel from "@/components/dashboard/InsightsPanel";

const Index = () => {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Header />
          <SummaryCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-2">
              <BalanceTrendChart />
            </div>
            <SpendingBreakdownChart />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-2">
              <TransactionsTable />
            </div>
            <InsightsPanel />
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
};

export default Index;
