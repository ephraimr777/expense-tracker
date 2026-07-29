import { useState, useEffect } from "react";

function SearchBar({ transactions, setFilteredTransactions }) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter((transaction) => {
      const description = transaction.description
        ?.toLowerCase()
        .trim();

      const category = transaction.category
        ?.toLowerCase()
        .trim();

      return (
        description?.includes(keyword) ||
        category?.includes(keyword)
      );
    });

    setFilteredTransactions(filtered);
  }, [search, transactions, setFilteredTransactions]);

  return (
    <div className="mt-6 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Search Transactions
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Search by description or category.
          </p>

        </div>

        <span className="text-3xl">🔍</span>

      </div>

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
          🔎
        </span>

        <input
          type="text"
          value={search}
          placeholder="Search transactions..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white pl-12 pr-12 py-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 text-xl transition"
          >
            ✕
          </button>
        )}

      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">

        <span>
          {search
            ? `Searching for "${search}"`
            : "Showing all transactions"}
        </span>

        <span>
          {transactions.length} transaction
          {transactions.length !== 1 ? "s" : ""}
        </span>

      </div>

    </div>
  );
}

export default SearchBar;