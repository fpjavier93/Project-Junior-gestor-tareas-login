export default function AppBackground({ children }) {
    return (
        <main className="relative min-h-screen overflow-hidden">
            <div
                className="fixed inset-0 bg-center bg-no-repeat bg-cover pointer-events-none opacity-40"
                style={{ backgroundImage: "url('/login-bg.jpg')" }}
            />

            <div className="relative z-10 min-h-screen">
                {children}
            </div>
        </main>
    )
}