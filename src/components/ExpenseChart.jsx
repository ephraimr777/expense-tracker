import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ transactions }) {
  const expenses = transactions.filter(
    (transaction) => Number(transaction.amount) < 0
  );

  const categoryTotals = {};

  expenses.forEach((transaction) => {
    const category = transaction.category;

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Math.abs(Number(transaction.amount));
  });

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const COLORS = [
    "#6366F1",
    "#3B82F6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#EC4899",
    "#8B5CF6",
    "#14B8A6",
    "#84CC16",
  ];

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-gray-200 dark:border-slate-700 p-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Expense by Category
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Visual breakdown of your spending.
          </p>

        </div>

        <div className="text-4xl">
          🥧
        </div>

      </div>

      {data.length === 0 ? (

        <div className="h-80 flex flex-col justify-center items-center">

          <div className="text-7xl mb-4">
            📉
          </div>

          <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
            No Expense Data
          </h3>

          <p className="text-gray-500 mt-2">
            Add an expense to generate the chart.
          </p>

        </div>

      ) : (

        <div className="h-[380px]">

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                paddingAngle={3}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString()}`,
                  "Spent",
                ]}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(0,0,0,.15)",
                }}
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: 20,
                  fontSize: 14,
                }}
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>
  );
}

export default ExpenseChart;