import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function ExportPDF({ transactions }) {
  const exportPDF = () => {
    if (transactions.length === 0) {
      alert("No transactions available!");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Expense Tracker Report", 14, 20);

    const tableData = transactions.map((transaction) => [
      transaction.description,
      transaction.category,
      transaction.type,
      `₹${transaction.amount}`,
      transaction.date,
    ]);

    autoTable(doc, {
      head: [["Description", "Category", "Type", "Amount", "Date"]],
      body: tableData,
      startY: 30,
      theme: "grid",
      headStyles: {
        fillColor: [37, 99, 235],
      },
    });

    doc.save("Expense_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow"
    >
      📄 Export PDF
    </button>
  );
}

export default ExportPDF;