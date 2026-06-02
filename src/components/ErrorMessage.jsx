

export default function ErrorMessage({ error, onTryAgain, onCancel }) {

    return (
        <div id="toast-danger" className="w-full max-w-xs p-4 mb-4 text-sm text-red-300 bg-red-900 border rounded-2xl" role="alert">
            <h3 className="font-semibold">Whoops! Ocurrio un error!</h3>
            <div className="mt-2 mb-4">
                {error}
            </div>
            <div className="flex items-center space-x-3">
                <button type="button" className="inline-flex items-center text-white bg-red-500 border rounded-2xl  hover:bg-danger-strong focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-xs px-3 py-1.5 focus:outline-none"
                    onClick={onTryAgain}>
                    <svg className="w-3.5 h-3.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01" /></svg>
                    Try again
                </button>
                <button type="button" data-dismiss-target="#toast-danger"
                    className="inline-flex items-center text-red-300 bg-red-900 border rounded hover:bg-danger-strong hover:border-danger-strong hover:text-white focus:ring-4 focus:ring-danger-medium shadow-xs font-medium leading-5 rounded-base text-xs px-3 py-1.5 focus:outline-none"
                    onClick={onCancel}>
                    Close
                </button>
            </div>
        </div>
    )
}