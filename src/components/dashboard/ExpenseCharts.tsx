import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FixedExpense, MonthlyExpense } from "@/types/expenses";

interface ExpenseChartsProps {
  fixedExpenses: FixedExpense[];
  monthlyExpenses: MonthlyExpense[];
}

const COLORS = [
  "hsl(214, 95%, 36%)",
  "hsl(142, 76%, 36%)",
  "hsl(0, 72%, 51%)",
  "hsl(38, 92%, 50%)",
  "hsl(280, 65%, 60%)",
  "hsl(190, 75%, 45%)",
  "hsl(25, 85%, 55%)",
  "hsl(340, 75%, 55%)"
];

export const ExpenseCharts = ({ fixedExpenses, monthlyExpenses }: ExpenseChartsProps) => {
  const allExpenses = [...fixedExpenses, ...monthlyExpenses];

  const categoryData = allExpenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.name === exp.category);
    if (existing) {
      existing.value += exp.amount;
    } else {
      acc.push({ name: exp.category, value: exp.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const typeData = [
    { name: "Contas Fixas", value: fixedExpenses.reduce((sum, exp) => sum + exp.amount, 0) },
    { name: "Gastos Variáveis", value: monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0) }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (allExpenses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Adicione contas e gastos para ver os gráficos</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Gastos por Categoria</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Fixas vs Variáveis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={typeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Bar dataKey="value" fill="hsl(214, 95%, 36%)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
