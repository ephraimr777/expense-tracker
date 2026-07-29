import React from "react";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-[90%] max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl p-6">

        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Delete Transaction
        </h2>

        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Are you sure you want to delete this transaction?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;