export default function Home() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-start " style={{ backgroundColor: "#7A1CAC" }}>
            <div className="font-[family-name:var(--font-now)] text-gray-200 text-6xl mt-20">
                Your Files ~
            </div>
            <div className="w-full max-w-md p-8 m-2 mt-20 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
                Galleries
            </div>
        </div>
    );
}