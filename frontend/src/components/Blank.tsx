export default function Blank() {
    return (
    <main className = "pt-16 flex-1">
        <section className="min-h-[calc(100vh-4rem)] py-16 px-8 sm:px-12 lg:px-16 geometric-pattern hero-gradient">
            <div
            className="max-w-6xl mx-auto h-full"
            style={{ background: "#f5f5f5f5", padding: "3rem", borderRadius: "0.25rem" }}
            >     
            {/* Placeholder Content - Replace with Your Page Content */}
                <div className="flex flex-col items-center justify-center min-h-[500px] rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                    <div
                        className="w-20 h-20 mb-6 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #ff3366, #ff6699)" }}
                    >
                        <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                        </svg>
                    </div>
                    <h1
                        className="font-display text-4xl md:text-5xl tracking-wide mb-4"
                        style={{ color: "#ff3366" }}
                    >
                        BLANK CANVAS
                    </h1>
                </div>
            </div>
        </section>
    </main>
    )
}