import React from "react";

const ConfirmModal = ({
  isOpen,
  isClose,
  isConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 transition-opacity py-4">
      <div className="bg-gray-900 border p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-8">{message}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={isClose}
            className="px-6 py-2 rounded-2xl font-bold bg-gray-800 w-full cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={isConfirm}
            className="px-6 py-2 rounded-2xl font-bold text-black bg-yellow-400 w-full cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
