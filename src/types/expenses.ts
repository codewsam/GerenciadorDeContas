export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  category: string;
  dueDay: number;
}

export interface MonthlyExpense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export const CATEGORIES = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Educação",
  "Lazer",
  "Vestuário",
  "Outros"
];
