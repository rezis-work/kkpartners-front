import * as Dialog from '@radix-ui/react-dialog'

interface NoDataDialogProps {
  open: boolean
  onClose: () => void
  message?: string
}

export default function NoDataDialog({ open, onClose, message }: NoDataDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(val) => !val && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-xl text-center">
          <h2 className="text-xl font-semibold mb-2">No Data</h2>
          <p className="text-gray-700">{message || 'No data available.'}</p>
          <button
            onClick={onClose}
            className="mt-6 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            OK
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
