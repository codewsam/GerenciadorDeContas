import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, FixedExpense, MonthlyExpense } from "@/types/expenses";
import { useToast } from "@/hooks/use-toast";

interface AddExpenseDialogProps {
  type: "fixed" | "monthly";
  onAdd: (expense: Omit<FixedExpense | MonthlyExpense, "id">) => void;
}

export const AddExpenseDialog = ({ type, onAdd }: AddExpenseDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [dueDay, setDueDay] = useState("");
  const [date, setDate] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !amount || !category) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    if (type === "fixed" && !dueDay) {
      toast({
        title: "Erro",
        description: "Informe o dia do vencimento",
        variant: "destructive",
      });
      return;
    }

    if (type === "monthly" && !date) {
      toast({
        title: "Erro",
        description: "Informe a data do gasto",
        variant: "destructive",
      });
      return;
    }

    const expense = type === "fixed"
      ? { name, amount: parseFloat(amount), category, dueDay: parseInt(dueDay) }
      : { name, amount: parseFloat(amount), category, date };

    onAdd(expense as any);
    
    toast({
      title: "Sucesso!",
      description: `${type === "fixed" ? "Conta fixa" : "Gasto"} adicionado com sucesso`,
    });

    setName("");
    setAmount("");
    setCategory("");
    setDueDay("");
    setDate("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "fixed" ? "Adicionar Conta Fixa" : "Adicionar Gasto"}
          </DialogTitle>
          <DialogDescription>
            Preencha as informações abaixo
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder={type === "fixed" ? "Ex: Aluguel" : "Ex: Supermercado"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {type === "fixed" ? (
            <div className="space-y-2">
              <Label htmlFor="dueDay">Dia do Vencimento</Label>
              <Input
                id="dueDay"
                type="number"
                min="1"
                max="31"
                placeholder="Ex: 10"
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
