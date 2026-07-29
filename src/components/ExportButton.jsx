import Papa from "papaparse";

function ExportButton({ transactions }) {
  const exportCSV = () => {
    if (transactions.length === 0) {
      alert("No transactions to export!");
      return;
    }

    const csv = Papa.unparse(
      transactions.map((t) => ({
        Description: t.description,
        Amount: t.amount,
        Type: t.type,
        Category: t.category,
        Date: t.date,
      }))
    );

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "transactions.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
    >
      📄 Export CSV
    </button>
  );
}

export default ExportButton;