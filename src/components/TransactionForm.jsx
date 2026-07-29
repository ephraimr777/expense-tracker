import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

function TransactionForm({
  editIndex,
  setEditIndex,
  editingTransaction,
  setEditingTransaction,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(today);

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(Math.abs(editingTransaction.amount));
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      resetForm();
    }
  }, [editingTransaction]);

  function resetForm() {
    setDescription("");
    setAmount("");
    setType("income");
    setCategory("Food");
    setDate(today);
  }

  async function handleSubmit() {
    if (!description.trim() || !amount) {
      alert("Please fill all fields");
      return;
    }

    const finalAmount =
      type === "expense"
        ? -Math.abs(Number(amount))
        : Math.abs(Number(amount));

    const transaction = {
      description,
      amount: finalAmount,
      type,
      category,
      date,
      uid: auth.currentUser.uid,
    };

    try {
      if (editingTransaction) {
        await updateDoc(
          doc(db, "transactions", editingTransaction.id),
          transaction
        );

        setEditIndex(null);
        setEditingTransaction(null);
      } else {
        await addDoc(collection(db, "transactions"), transaction);
      }

      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to save transaction.");
    }
  }

  return (
    <div className="mt-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-8">

      <div className="flex items-center gap-3 mb-8">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-3xl">
          💰
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            {editingTransaction
              ? "Edit Transaction"
              : "Add Transaction"}
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            Record your income and expenses.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Description
          </label>

          <input
            type="text"
            placeholder="Ex: Grocery Shopping"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Amount
          </label>

          <input
            type="number"
            placeholder="₹0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onWheel={(e) => e.target.blur()}
            className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Transaction Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4"
          >
            <option value="income">💰 Income</option>
            <option value="expense">💸 Expense</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4"
          >
            <option>Food</option>
            <option>Salary</option>
            <option>Shopping</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Bills</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Travel</option>
            <option>Investment</option>
            <option>Other</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
            Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4"
          />
        </div>

      </div>

      <div className="flex gap-4 mt-8">

        {editingTransaction && (
          <button
            onClick={() => {
              setEditIndex(null);
              setEditingTransaction(null);
              resetForm();
            }}
            className="px-8 py-4 rounded-2xl bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white transition font-semibold"
          >
            Cancel
          </button>
        )}

        <button
          onClick={handleSubmit}
          className={`flex-1 py-4 rounded-2xl font-bold text-lg text-white transition-all duration-300 hover:scale-[1.02]
          ${
            editingTransaction
              ? "bg-gradient-to-r from-green-500 to-emerald-600"
              : "bg-gradient-to-r from-blue-600 to-indigo-600"
          }`}
        >
          {editingTransaction
            ? "✅ Update Transaction"
            : "➕ Add Transaction"}
        </button>

      </div>

    </div>
  );
}

export default TransactionForm;