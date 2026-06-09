export function TaskEmptyState({ message }) {

    return (
        <div>
            <div className="flex flex-col">
                <div className="flex justify-center px-5 py-4 text-4xl font-bold border-b border-gray-300">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}