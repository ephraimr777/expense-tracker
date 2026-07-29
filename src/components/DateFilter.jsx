import { useState } from "react";

function DateFilter({ transactions, setFilteredTransactions }) {
  const [filter, setFilter] = useState("All");

  const applyFilter = (value) => {
    setFilter(value);

    if (value === "All") {
      setFilteredTransactions(transactions);
      return;
    }

    const today = new Date();

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      switch (value) {
        case "Today":
          return (
            transactionDate.toDateString() ===
            today.toDateString()
          );

        case "This Week": {
          const firstDay = new Date(today);
          firstDay.setDate(today.getDate() - today.getDay());

          return transactionDate >= firstDay;
        }

        case "This Month":
          return (
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() ===
              today.getFullYear()
          );

        case "This Year":
          return (
            transactionDate.getFullYear() ===
            today.getFullYear()
          );

        default:
          return true;
      }
    });

    setFilteredTransactions(filtered);
  };

  const filters = [
    "All",
    "Today",
    "This Week",
    "This Month",
    "This Year",
  ];

  return (
    <div className="mt-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Filter Transactions
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View transactions for a specific time period.
          </p>

        </div>

        <span className="text-3xl">📅</span>

      </div>

      <div className="flex flex-wrap gap-3">

        {filters.map((item) => (
          <button
            key={item}
            onClick={() => applyFilter(item)}
            className={`px-5 py-3 rounded-2xl font-medium transition-all duration-300 ${
              filter === item
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg scale-105"
                : "bg-gray-100 dark:bg-slate-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            {item}
          </button>
        ))}

      </div>

      <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">
        Active Filter:
        <span className="ml-2 font-semibold text-indigo-600 dark:text-indigo-400">
          {filter}
        </span>
      </div>

    </div>
  );
}

export default DateFilter;