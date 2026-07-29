import { useEffect, useState } from "react";

function BudgetCard({ transactions }) {
  const [budget, setBudget] = useState(() => {
    return Number(localStorage.getItem("budget")) || 20000;
  });

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  const expense = transactions
    .filter((t) => Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const remaining = budget - expense;

  const percentage =
    budget > 0
      ? Math.min((expense / budget) * 100, 100)
      : 0;

  const status =
    percentage < 60
      ? "Excellent"
      : percentage < 85
      ? "Warning"
      : "Critical";

  const progressColor =
    percentage < 60
      ? "from-green-500 to-emerald-600"
      : percentage < 85
      ? "from-yellow-400 to-orange-500"
      : "from-red-500 to-pink-600";

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-6">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">
              🎯 Monthly Budget
            </h2>

            <p className="text-purple-100 mt-2">
              Stay within your monthly spending target.
            </p>

          </div>

          <div className="text-5xl">
            💼
          </div>

        </div>

      </div>

      <div className="p-6">

        <label className="block font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Set Budget
        </label>

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full rounded-2xl border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white px-5 py-4 text-xl font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        {/* Progress */}

        <div className="mt-8">

          <div className="flex justify-between mb-3">

            <span className="font-semibold">
              Budget Usage
            </span>

            <span className="font-bold">
              {percentage.toFixed(0)}%
            </span>

          </div>

          <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">

            <div
              className={`h-full bg-gradient-to-r ${progressColor} transition-all duration-700`}
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-5 mt-8">

          <div className="rounded-2xl bg-indigo-50 dark:bg-slate-800 p-5">

            <p className="text-gray-500 dark:text-gray-400">
              Budget
            </p>

            <h3 className="text-2xl font-bold mt-2">
              ₹{budget.toLocaleString()}
            </h3>

          </div>

          <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-5">

            <p className="text-gray-500 dark:text-gray-400">
              Spent
            </p>

            <h3 className="text-2xl font-bold text-red-600 mt-2">
              ₹{expense.toLocaleString()}
            </h3>

          </div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-5">

            <p className="text-gray-500 dark:text-gray-400">
              Remaining
            </p>

            <h3
              className={`text-2xl font-bold mt-2 ${
                remaining >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ₹{remaining.toLocaleString()}
            </h3>

          </div>

        </div>

        {/* Status */}

        <div className="mt-8 rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">

          <div className="flex justify-between items-center">

            <span className="font-semibold text-lg">
              Budget Status
            </span>

            <span
              className={`px-4 py-2 rounded-full font-bold text-white ${
                status === "Excellent"
                  ? "bg-green-500"
                  : status === "Warning"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {status}
            </span>

          </div>

          <p className="mt-4 text-gray-600 dark:text-gray-400">

            {status === "Excellent" &&
              "🎉 Great! You're spending well within your budget."}

            {status === "Warning" &&
              "⚠️ You're approaching your budget limit."}

            {status === "Critical" &&
              "🚨 Budget limit reached. Try reducing unnecessary expenses."}

          </p>

        </div>

      </div>

    </div>
  );
}

export default BudgetCard;