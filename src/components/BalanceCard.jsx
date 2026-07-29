function BalanceCard({ transactions }) {
  const income = transactions
    .filter((t) => Number(t.amount) > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => Number(t.amount) < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  const balance = income - expense;

  return (
    <div className="rounded-3xl p-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl hover:scale-[1.02] transition-all duration-300">

      <p className="text-sm uppercase tracking-widest opacity-80">
        Available Balance
      </p>

      <h1 className="text-5xl font-bold mt-4">
        ₹ {balance.toLocaleString()}
      </h1>

      <div className="mt-8 grid grid-cols-2 gap-5">

        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
          <p className="text-xs opacity-70">Income</p>

          <h2 className="text-2xl font-bold mt-2">
            ₹ {income.toLocaleString()}
          </h2>
        </div>

        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-md">
          <p className="text-xs opacity-70">Expense</p>

          <h2 className="text-2xl font-bold mt-2">
            ₹ {expense.toLocaleString()}
          </h2>
        </div>

      </div>

    </div>
  );
}

export default BalanceCard;