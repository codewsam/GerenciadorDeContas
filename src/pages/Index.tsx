import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseCharts } from "@/components/dashboard/ExpenseCharts";
import { FixedExpensesList } from "@/components/expenses/FixedExpensesList";
import { MonthlyExpensesList } from "@/components/expenses/MonthlyExpensesList";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { FixedExpense, MonthlyExpense } from "@/types/expenses";

// Lê os dados salvos no navegador (localStorage)
const loadSaved = <T,>(key: string): T[] => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T[]) : [];
  } catch {
    return [];
  }
};

const Index = () => {
  // Já inicia o estado com o que estava salvo
  const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>(() =>
    loadSaved<FixedExpense>("fixedExpenses")
  );
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyExpense[]>(() =>
    loadSaved<MonthlyExpense>("monthlyExpenses")
  );

  // Salva sempre que algo mudar
  useEffect(() => {
    localStorage.setItem("fixedExpenses", JSON.stringify(fixedExpenses));
  }, [fixedExpenses]);

  useEffect(() => {
    localStorage.setItem("monthlyExpenses", JSON.stringify(monthlyExpenses));
  }, [monthlyExpenses]);


  const addFixedExpense = (expense: Omit<FixedExpense, "id">) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setFixedExpenses([...fixedExpenses, newExpense]);
  };

  const addMonthlyExpense = (expense: Omit<MonthlyExpense, "id">) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setMonthlyExpenses([...monthlyExpenses, newExpense]);
  };

  const deleteFixedExpense = (id: string) => {
    setFixedExpenses(fixedExpenses.filter(e => e.id !== id));
  };

  const deleteMonthlyExpense = (id: string) => {
    setMonthlyExpenses(monthlyExpenses.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <FinancialSummary 
          fixedExpenses={fixedExpenses}
          monthlyExpenses={monthlyExpenses}
        />

        <div className="mt-8">
          <ExpenseCharts 
            fixedExpenses={fixedExpenses}
            monthlyExpenses={monthlyExpenses}
          />
        </div>

        <div className="mt-8">
          <Tabs defaultValue="fixed" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="fixed">Contas Fixas</TabsTrigger>
              <TabsTrigger value="monthly">Gastos do Mês</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fixed" className="mt-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Contas Fixas</h2>
                  <AddExpenseDialog 
                    type="fixed"
                    onAdd={addFixedExpense}
                  />
                </div>
                <FixedExpensesList 
                  expenses={fixedExpenses}
                  onDelete={deleteFixedExpense}
                />
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Gastos do Mês</h2>
                  <AddExpenseDialog 
                    type="monthly"
                    onAdd={addMonthlyExpense}
                  />
                </div>
                <MonthlyExpensesList 
                  expenses={monthlyExpenses}
                  onDelete={deleteMonthlyExpense}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
