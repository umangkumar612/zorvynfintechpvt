export type TransactionType = "income" | "expense";
export type Category =
  | "Salary"
  | "Freelance"
  | "Food & Dining"
  | "Shopping"
  | "Transportation"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Investment"
  | "Rent"
  | "Travel"
  | "Education";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export type Role = "admin" | "viewer";

const categories: Category[] = [
  "Salary", "Freelance", "Food & Dining", "Shopping", "Transportation",
  "Entertainment", "Utilities", "Healthcare", "Investment", "Rent", "Travel", "Education",
];

const incomeCategories: Category[] = ["Salary", "Freelance", "Investment"];
const expenseCategories: Category[] = [
  "Food & Dining", "Shopping", "Transportation", "Entertainment",
  "Utilities", "Healthcare", "Rent", "Travel", "Education",
];

const incomeDescriptions: Record<string, string[]> = {
  Salary: ["Monthly Salary", "Bonus Payment", "Overtime Pay"],
  Freelance: ["Web Design Project", "Consulting Fee", "Logo Design"],
  Investment: ["Stock Dividend", "Crypto Gain", "Interest Income"],
};

const expenseDescriptions: Record<string, string[]> = {
  "Food & Dining": ["Grocery Store", "Restaurant Dinner", "Coffee Shop", "Lunch"],
  Shopping: ["Amazon Purchase", "Clothing Store", "Electronics", "Home Decor"],
  Transportation: ["Gas Station", "Uber Ride", "Parking Fee", "Metro Card"],
  Entertainment: ["Netflix Subscription", "Movie Tickets", "Concert", "Spotify"],
  Utilities: ["Electric Bill", "Internet Bill", "Water Bill", "Phone Bill"],
  Healthcare: ["Pharmacy", "Doctor Visit", "Gym Membership", "Dental Checkup"],
  Rent: ["Monthly Rent", "Maintenance Fee"],
  Travel: ["Flight Ticket", "Hotel Booking", "Travel Insurance"],
  Education: ["Online Course", "Books", "Workshop Fee"],
};

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTransactions(): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();

  for (let i = 0; i < 80; i++) {
    const daysAgo = Math.floor(Math.random() * 180);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    const isIncome = Math.random() < 0.3;
    const type: TransactionType = isIncome ? "income" : "expense";
    const category = isIncome ? randomPick(incomeCategories) : randomPick(expenseCategories);
    const descriptions = isIncome ? incomeDescriptions[category] : expenseDescriptions[category];
    const description = randomPick(descriptions || ["Transaction"]);

    const amount = isIncome
      ? Math.round((Math.random() * 4000 + 1000) * 100) / 100
      : Math.round((Math.random() * 500 + 10) * 100) / 100;

    transactions.push({
      id: `txn-${i + 1}`,
      date: date.toISOString().split("T")[0],
      description,
      amount,
      category,
      type,
    });
  }

  return transactions.sort((a, b) => b.date.localeCompare(a.date));
}

export const mockTransactions: Transaction[] = generateTransactions();

export const allCategories = categories;
export { incomeCategories, expenseCategories };
