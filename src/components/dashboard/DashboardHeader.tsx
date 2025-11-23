import { Wallet } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gerenciador Financeiro</h1>
            <p className="text-sm text-muted-foreground">Controle suas contas e gastos mensais</p>
          </div>
        </div>
      </div>
    </header>
  );
};
