import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ConfirmDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  question: string;
  loading: boolean;
}

export default function ConfirmDeleteModal({
  open,
  onConfirm,
  onCancel,
  question = "Are you sure you want to delete this item?",
  loading,
}: ConfirmDeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
    toast.success("Item successfully deleted");
  };

  return (
    <Dialog.Root open={open} onOpenChange={(val) => !val && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Confirm Deletion</h2>
            <button onClick={onCancel}>
              <X className="cursor-pointer w-5 h-5 text-gray-500 hover:text-gray-800" />
            </button>
          </div>
          <p className="text-gray-700 mb-6">{question}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="cursor-pointer px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
