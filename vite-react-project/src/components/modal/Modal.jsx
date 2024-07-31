export default function Modal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    function backgroundClickHandler(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div onClick={backgroundClickHandler} className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this recipe? This action cannot be undone.</p>
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-black rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
