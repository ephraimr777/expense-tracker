import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

function MonthlyTrendChart({ transactions }) {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    if (transaction.type !== "expense") return;

    const date = new Date(transaction.date);

    const month = date.toLocaleString("default", {
      month: "short",
    });

    monthlyData[month] =
      (monthlyData[month] || 0) +
      Math.abs(Number(transaction.amount));
  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    expense: monthlyData[month],
  }));

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Monthly Expense Trend
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track your monthly spending pattern.
          </p>

        </div>

        <div className="text-4xl">
          📈
        </div>

      </div>

      {chartData.length === 0 ? (

        <div className="h-[380px] flex flex-col items-center justify-center">

          <div className="text-7xl mb-4">
            📉
          </div>

          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            No Monthly Data
          </h3>

          <p className="text-gray-500 mt-2">
            Add expense transactions to see trends.
          </p>

        </div>

      ) : (

        <div className="h-[380px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={chartData}>

              <defs>

                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#EF4444"
                    stopOpacity={0.4}
                  />

                  <stop
                    offset="95%"
                    stopColor="#EF4444"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="5 5"
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#6B7280",
                  fontSize: 13,
                }}
              />

              <YAxis
                tick={{
                  fill: "#6B7280",
                  fontSize: 13,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Expense",
                ]}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,.15)",
                }}
              />

              <Area
                type="monotone"
                dataKey="expense"
                stroke="#EF4444"
                strokeWidth={4}
                fill="url(#expenseGradient)"
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#DC2626"
                strokeWidth={3}
                dot={{
                  r: 6,
                  fill: "#DC2626",
                }}
                activeDot={{
                  r: 8,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      )}

      {/* Footer Stats */}

      <div className="grid md:grid-cols-3 gap-4 mt-8">

        <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-5">

          <p className="text-gray-500 dark:text-gray-400">
            Months Tracked
          </p>

          <h3 className="text-3xl font-bold text-red-600 mt-2">
            {chartData.length}
          </h3>

        </div>

        <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 p-5">

          <p className="text-gray-500 dark:text-gray-400">
            Highest Month
          </p>

          <h3 className="text-2xl font-bold text-indigo-600 mt-2">

            {chartData.length
              ? chartData.reduce((a, b) =>
                  a.expense > b.expense ? a : b
                ).month
              : "--"}

          </h3>

        </div>

        <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-5">

          <p className="text-gray-500 dark:text-gray-400">
            Total Expenses
          </p>

          <h3 className="text-3xl font-bold text-emerald-600 mt-2">

            ₹
            {chartData
              .reduce((sum, item) => sum + item.expense, 0)
              .toLocaleString()}

          </h3>

        </div>

      </div>

    </div>
  );
}

export default MonthlyTrendChart;