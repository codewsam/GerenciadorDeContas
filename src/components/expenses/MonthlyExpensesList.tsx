import { Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MonthlyExpense } from "@/types/expenses";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MonthlyExpensesListProps {
  expenses: MonthlyExpense[];
  onDelete: (id: string) => void;
}

export const MonthlyExpensesList = ({ expenses, onDelete }: MonthlyExpensesListProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Nenhum gasto registrado este mês</p>
        <p className="text-sm mt-2">Adicione seus gastos variáveis</p>
      </div>
    );
  }

  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedExpenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-foreground">{expense.name}</h3>
              <span className="text-xs px-2 py-1 bg-warning/10 text-warning rounded-full">
                {expense.category}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(expense.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-warning">
              {formatCurrency(expense.amount)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(expense.id)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
