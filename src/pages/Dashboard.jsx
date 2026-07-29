import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import BalanceCard from "../components/BalanceCard";
import BudgetCard from "../components/BudgetCard";
import ExportButton from "../components/ExportButton";
import ExportPDF from "../components/ExportPDF";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import SearchBar from "../components/SearchBar";
import DateFilter from "../components/DateFilter";
import DeleteModal from "../components/DeleteModal";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [transactionToDelete, setTransactionToDelete] = useState(null);
  // NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "transactions"),
      where("uid", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(data);
        setFilteredTransactions(data);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        toast.error("Failed to load transactions.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

 function deleteTransaction(id) {
  setTransactionToDelete(id);
  setShowDeleteModal(true);
}

async function confirmDelete() {
  try {
    await deleteDoc(doc(db, "transactions", transactionToDelete));

    toast.success("Transaction deleted successfully.");

    setShowDeleteModal(false);
    setTransactionToDelete(null);

    setEditIndex(null);
    setEditingTransaction(null);

  } catch (error) {
    console.error(error);
    toast.error("Failed to delete transaction.");
  }

  }

  function startEditing(transaction) {
    setEditIndex(transaction.id);
    setEditingTransaction(transaction);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    toast.info("Editing transaction...");
  }
/* ---------- Dashboard Calculations ---------- */

const income = useMemo(() => {
  return filteredTransactions
    .filter((t) => Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);
}, [filteredTransactions]);

const expense = useMemo(() => {
  return filteredTransactions
    .filter((t) => Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
}, [filteredTransactions]);

const balance = useMemo(() => {
  return income - expense;
}, [income, expense]);

const topCategory = useMemo(() => {
  const totals = {};

  filteredTransactions.forEach((t) => {
    if (Number(t.amount) < 0) {
      totals[t.category] =
        (totals[t.category] || 0) +
        Math.abs(Number(t.amount));
    }
  });

  const entries = Object.entries(totals);

  if (entries.length === 0) return "No Data";

  entries.sort((a, b) => b[1] - a[1]);

  return entries[0][0];
}, [filteredTransactions]);

const latestTransaction =
  filteredTransactions.length > 0
    ? filteredTransactions[0]
    : null;

const totalTransactions =
  filteredTransactions.length;

const averageExpense =
  totalTransactions > 0
    ? Math.round(expense / totalTransactions)
    : 0;

/* ---------- Loading Screen ---------- */

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">

      <div className="text-center">

        <div className="h-16 w-16 mx-auto rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800 dark:text-white">
          Loading Dashboard...
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Fetching your latest transactions...
        </p>

      </div>

    </div>
  );
}

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-300">

  <Navbar />

  <div className="max-w-7xl mx-auto px-5 py-8">

    {/* ================= HERO ================= */}

    <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-2xl p-8 mb-8">

      <div className="flex flex-col lg:flex-row justify-between gap-8">

        <div>

          <h1 className="text-4xl lg:text-5xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-lg text-blue-100 max-w-2xl">
            Monitor your finances, analyse spending,
            and stay in control of your monthly budget.
          </p>

          <div className="flex flex-wrap gap-3 mt-6">

            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
              💳 {totalTransactions} Transactions
            </div>

            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
              🏆 {topCategory}
            </div>

            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md">
              📉 Avg Expense ₹{averageExpense.toLocaleString()}
            </div>

          </div>

        </div>

        <div className="rounded-3xl bg-white/15 backdrop-blur-lg shadow-xl p-8 min-w-[280px]">

          <p className="text-blue-100">
            Current Balance
          </p>

          <h2
            className={`text-5xl font-bold mt-2 ${
              balance >= 0
                ? "text-green-300"
                : "text-red-300"
            }`}
          >
            ₹{balance.toLocaleString()}
          </h2>

          <p className="mt-5 text-blue-100">

            {balance >= 0
              ? "🎉 Excellent! You're saving money."
              : "⚠ Expenses are greater than income."}

          </p>

        </div>

      </div>

    </div>

    {/* ================= KPI CARDS ================= */}

    <StatsCards
      transactions={filteredTransactions}
    />

    {/* ================= BALANCE + BUDGET ================= */}

    <div className="grid lg:grid-cols-2 gap-6 mt-8">

      <BalanceCard
        transactions={filteredTransactions}
      />

      <BudgetCard
        transactions={filteredTransactions}
      />

    </div>

    {/* ================= EXPORT ================= */}

    <div className="flex flex-wrap justify-end gap-4 mt-8">

      <ExportButton
        transactions={filteredTransactions}
      />

      <ExportPDF
        transactions={filteredTransactions}
      />

    </div>

    {/* ================= SEARCH ================= */}

<div className="grid md:grid-cols-2 gap-5 mt-8">

  <SearchBar
    transactions={transactions}
    setFilteredTransactions={setFilteredTransactions}
  />

  <DateFilter
    transactions={transactions}
    setFilteredTransactions={setFilteredTransactions}
  />

</div>

{/* ================= TRANSACTION FORM ================= */}

<div className="mt-8">

  <TransactionForm
    editIndex={editIndex}
    setEditIndex={setEditIndex}
    editingTransaction={editingTransaction}
    setEditingTransaction={setEditingTransaction}
  />

</div>

{/* ================= DASHBOARD ANALYTICS ================= */}

<div className="grid xl:grid-cols-2 gap-6 mt-10">

  {/* Expense Overview */}

  <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

    <div className="flex items-center justify-between mb-6">

      <div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Expense Overview
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Spending by category
        </p>

      </div>

      <span className="text-4xl">
        🥧
      </span>

    </div>

    <ExpenseChart
      transactions={filteredTransactions}
    />

  </div>

  {/* Income vs Expense */}

  <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

    <div className="flex items-center justify-between mb-6">

      <div>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Income vs Expense
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Compare earnings and spending
        </p>

      </div>

      <span className="text-4xl">
        📊
      </span>

    </div>

    <IncomeExpenseChart
      transactions={filteredTransactions}
    />

  </div>

</div>

{/* ================= MONTHLY TREND ================= */}

<div className="mt-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Monthly Spending Trend
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mt-1">
        Track your monthly expense pattern
      </p>

    </div>

    <span className="text-4xl">
      📈
    </span>

  </div>

  <MonthlyTrendChart
    transactions={filteredTransactions}
  />

</div>

{/* ================= SMART INSIGHTS ================= */}

<div className="grid lg:grid-cols-2 gap-6 mt-10">

  {/* AI Insight */}

  <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-2xl p-7">

    <h2 className="text-2xl font-bold mb-6">
      🤖 AI Financial Insight
    </h2>

    <div className="space-y-5 leading-7 text-blue-100">

      {balance > 0 ? (
        <p>
          ✅ Your balance is healthy. Continue saving consistently and avoid unnecessary expenses.
        </p>
      ) : (
        <p>
          ⚠ Your expenses currently exceed your income. Consider reviewing your spending habits.
        </p>
      )}

      {expense > income * 0.8 && (
        <p>
          💡 More than 80% of your income has been spent. Setting a monthly budget can improve your savings.
        </p>
      )}

      {income > expense && (
        <p>
          🚀 Excellent! Your income is greater than your expenses. You're maintaining good financial discipline.
        </p>
      )}

    </div>

  </div>

  {/* Quick Analytics */}

  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 p-7">

    <h2 className="text-2xl font-bold mb-6">
      📊 Quick Analytics
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between items-center">
        <span className="text-gray-500 dark:text-gray-400">
          Total Transactions
        </span>

        <span className="font-bold text-xl">
          {totalTransactions}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-500 dark:text-gray-400">
          Highest Spending Category
        </span>

        <span className="font-bold text-indigo-600 dark:text-indigo-400">
          {topCategory}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-500 dark:text-gray-400">
          Average Expense
        </span>

        <span className="font-bold text-red-500">
          ₹{averageExpense.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-500 dark:text-gray-400">
          Savings
        </span>

        <span
          className={`font-bold ${
            balance >= 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          ₹{balance.toLocaleString()}
        </span>
      </div>

    </div>

  </div>

</div>

{/* ================= TRANSACTIONS ================= */}

<div className="mt-10 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-200 dark:border-slate-700 p-6">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">

    <div>

      <h2 className="text-2xl font-bold">
        Recent Transactions
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mt-1">
        View, edit and manage all your financial activity.
      </p>

    </div>

    <div className="mt-4 md:mt-0 px-4 py-2 rounded-xl bg-indigo-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 font-semibold">

      {totalTransactions} Records

    </div>

  </div>

  <TransactionList
    transactions={filteredTransactions}
    deleteTransaction={deleteTransaction}
    startEditing={startEditing}
  />

</div>

{/* ================= FINANCIAL SUMMARY ================= */}

<div className="mt-10 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-2xl p-8">

  <h2 className="text-2xl font-bold mb-6">
    📈 Financial Summary
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5">

      <p className="text-emerald-100">
        Latest Transaction
      </p>

      <h3 className="text-xl font-bold mt-2">
        {latestTransaction
          ? latestTransaction.title
          : "No Transactions"}
      </h3>

    </div>

    <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5">

      <p className="text-emerald-100">
        Total Income
      </p>

      <h3 className="text-3xl font-bold mt-2 text-green-200">
        ₹{income.toLocaleString()}
      </h3>

    </div>

    <div className="rounded-2xl bg-white/15 backdrop-blur-md p-5">

      <p className="text-emerald-100">
        Total Expenses
      </p>

      <h3 className="text-3xl font-bold mt-2 text-red-200">
        ₹{expense.toLocaleString()}
      </h3>

    </div>

  </div>

</div>


{/* ================= FOOTER ================= */}

<footer className="mt-14 border-t border-gray-200 dark:border-slate-700 pt-8 pb-6">

  <div className="flex flex-col items-center text-center">

    <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
      E_SHAWN PROJECTS
    </h2>

    <p className="mt-2 text-gray-500 dark:text-gray-400">
      Expense Tracker • React • Firebase • Tailwind CSS
    </p>

    <p className="mt-4 text-sm text-gray-400">
      Crafted with ❤️ by <span className="font-semibold text-indigo-500">E_SHAWN</span>
    </p>

    <p className="text-xs mt-3 text-gray-400">
      © 2026 E_SHAWN PROJECTS. All Rights Reserved.
    </p>

  </div>

</footer>

</div>

</div>

);

}

export default Dashboard;