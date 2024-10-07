import NavbarLogin from "@/components/navbar/NavbarLogin";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#7A1CAC" }}>
            <NavbarLogin />
            <div className="flex-grow flex flex-col items-center justify-start">
                <div className="font-[family-name:var(--font-now)] text-gray-200 text-6xl mt-20">
                    Upload Files!
                </div>
                <div className="w-full max-w-md p-8 m-2 mt-20 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="text-gray-200 label-text text-lg font-semibold">Pick a file</span>
                        </div>
                        <input type="file" className="file-input file-input-bordered w-full" />
                        <div className="label">
                            <span className="text-gray-200 label-text-alt text-sm">.jpg .jpeg .png .pdf .mp4 .mov</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
