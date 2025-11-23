import { Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FixedExpense } from "@/types/expenses";

interface FixedExpensesListProps {
  expenses: FixedExpense[];
  onDelete: (id: string) => void;
}

export const FixedExpensesList = ({ expenses, onDelete }: FixedExpensesListProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Nenhuma conta fixa cadastrada</p>
        <p className="text-sm mt-2">Adicione suas contas recorrentes do mês</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-foreground">{expense.name}</h3>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {expense.category}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Vencimento: dia {expense.dueDay}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-destructive">
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
