import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { FixedExpense, MonthlyExpense } from "@/types/expenses";

interface FinancialSummaryProps {
  fixedExpenses: FixedExpense[];
  monthlyExpenses: MonthlyExpense[];
}

export const FinancialSummary = ({ fixedExpenses, monthlyExpenses }: FinancialSummaryProps) => {
  const totalFixed = fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalMonthly = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalExpenses = totalFixed + totalMonthly;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Contas Fixas</p>
            <p className="text-3xl font-bold text-destructive">{formatCurrency(totalFixed)}</p>
          </div>
          <div className="bg-destructive/10 p-3 rounded-full">
            <TrendingDown className="w-6 h-6 text-destructive" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">{fixedExpenses.length} conta(s) cadastrada(s)</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Gastos Variáveis</p>
            <p className="text-3xl font-bold text-warning">{formatCurrency(totalMonthly)}</p>
          </div>
          <div className="bg-warning/10 p-3 rounded-full">
            <TrendingUp className="w-6 h-6 text-warning" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">{monthlyExpenses.length} gasto(s) este mês</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Total do Mês</p>
            <p className="text-3xl font-bold text-primary">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="bg-primary/10 p-3 rounded-full">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">Fixas + Variáveis</p>
      </Card>
    </div>
  );
};
