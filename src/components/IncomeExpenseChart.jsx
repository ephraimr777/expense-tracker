import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

function IncomeExpenseChart({ transactions }) {
  const income = transactions
    .filter((t) => Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const data = [
    {
      name: "Income",
      amount: income,
      color: "#10B981",
    },
    {
      name: "Expense",
      amount: expense,
      color: "#EF4444",
    },
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Income vs Expense
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Compare your earnings and spending.
          </p>

        </div>

        <div className="text-4xl">
          📊
        </div>

      </div>

      <div className="h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart
            data={data}
            barCategoryGap={60}
          >

            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="name"
              tick={{
                fill: "#6B7280",
                fontSize: 14,
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
                "Amount",
              ]}
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 12px 25px rgba(0,0,0,.15)",
              }}
            />

            <Bar
              dataKey="amount"
              radius={[12, 12, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-5">

          <p className="text-gray-500 dark:text-gray-400">
            Total Income
          </p>

          <h3 className="text-3xl font-bold text-green-600 mt-2">
            ₹{income.toLocaleString()}
          </h3>

        </div>

        <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-5">

          <p className="text-gray-500 dark:text-gray-400">
            Total Expense
          </p>

          <h3 className="text-3xl font-bold text-red-600 mt-2">
            ₹{expense.toLocaleString()}
          </h3>

        </div>

      </div>

    </div>
  );
}

export default IncomeExpenseChart;