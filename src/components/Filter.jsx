function Filter({ filter, setFilter }) {
  const filters = [
    "All",
    "Today",
    "This Week",
    "This Month",
    "This Year",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">
        Filter Transactions
      </h2>

      <div className="flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-lg transition ${
              filter === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;