import { useState } from "react";

function TransactionList({
  transactions = [],
  deleteTransaction,
  startEditing,
}) {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Transaction History
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your income and expenses.
          </p>
        </div>

        <div className="bg-indigo-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 px-5 py-2 rounded-xl font-semibold">
          {filteredTransactions.length} Records
        </div>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search description..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-8 rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4 focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Empty State */}

      {filteredTransactions.length === 0 && (

        <div className="text-center py-20">

          <div className="text-7xl mb-4">
            📂
          </div>

          <h2 className="text-2xl font-bold text-gray-700 dark:text-white">
            No Transactions Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first transaction to start tracking.
          </p>

        </div>

      )}

      {/* Cards */}

      <div className="space-y-5">

        {filteredTransactions.map((transaction) => (

          <div
            key={transaction.id}
            className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-gradient-to-r from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6"
          >

            <div className="flex flex-col lg:flex-row justify-between gap-6">

              {/* Left */}

              <div className="flex gap-5">

                <div
                  className={`h-16 w-16 rounded-2xl flex items-center justify-center text-3xl shadow-md
                  ${
                    transaction.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "💰" : "💸"}
                </div>

                <div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {transaction.description}
                  </h3>

                  <div className="flex flex-wrap gap-3 mt-3">

                    <span className="bg-indigo-100 text-indigo-700 dark:bg-slate-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm">
                      📂 {transaction.category}
                    </span>

                    <span className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full text-sm dark:text-gray-300">
                      📅 {transaction.date}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                      ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type === "income"
                        ? "Income"
                        : "Expense"}
                    </span>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div className="flex flex-col items-end justify-between">

                <div
                  className={`text-3xl font-extrabold
                  ${
                    Number(transaction.amount) > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {Number(transaction.amount) > 0 ? "+" : "-"}₹
                  {Math.abs(Number(transaction.amount)).toLocaleString()}
                </div>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => startEditing(transaction)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold hover:scale-105 transition"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:scale-105 transition"
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TransactionList;