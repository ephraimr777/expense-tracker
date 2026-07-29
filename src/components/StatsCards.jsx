function Card({
  title,
  value,
  icon,
  gradient,
  subtitle,
  trend,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 text-white shadow-xl ${gradient}
      hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300`}
    >
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
      <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-white/80 text-sm font-medium">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {value}
          </h2>

          <p className="mt-3 text-sm text-white/90">
            {subtitle}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            {trend}
          </div>
        </div>

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl backdrop-blur-md">
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatsCards({ transactions }) {
  const income = transactions
    .filter((t) => Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const balance = income - expense;

  const total = transactions.length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Current Balance"
        value={`₹${balance.toLocaleString()}`}
        icon="💳"
        subtitle={
          balance >= 0
            ? "Healthy financial status"
            : "Needs attention"
        }
        trend={balance >= 0 ? "▲ Positive" : "▼ Negative"}
        gradient="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500"
      />

      <Card
        title="Income"
        value={`₹${income.toLocaleString()}`}
        icon="📈"
        subtitle="Money received"
        trend="▲ Cash Flow"
        gradient="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600"
      />

      <Card
        title="Expenses"
        value={`₹${expense.toLocaleString()}`}
        icon="📉"
        subtitle="Money spent"
        trend="▼ Spending"
        gradient="bg-gradient-to-br from-red-500 via-pink-500 to-rose-600"
      />

      <Card
        title="Transactions"
        value={total}
        icon="🧾"
        subtitle="Recorded activities"
        trend={`${total} Total`}
        gradient="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600"
      />

    </div>
  );
}

export default StatsCards;