import { Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FixedExpense } from "@/types/expenses";

interface FixedExpensesListProps {
  expenses: FixedExpense[];
  onDelete: (id: string) => void;
}

export const FixedExpensesList = ({ expenses, onDelete }: FixedExpensesListProps) => {
  if (expenses.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">Nenhuma conta fixa cadastrada</div>;
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div key={expense.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{expense.name}</h3>
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{expense.category}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="w-4 h-4" />
              <span>Dia {expense.dueDay}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-destructive">
              R$ {expense.amount.toFixed(2)}
            </span>
            <Button variant="ghost" size="icon" onClick={() => onDelete(expense.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
