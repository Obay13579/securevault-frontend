import React from 'react';
import NavbarLogin from "@/components/navbar/NavbarLogin";
import Files from "@/components/cards/file";

export default function Gallery() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#7A1CAC" }}>
            <NavbarLogin />
            <div className="flex-grow flex flex-col items-center justify-start">
                <div className="font-[family-name:var(--font-now)] text-gray-200 text-6xl mt-20">
                    Your Files
                </div>
                <div className="w-full p-8 m-2 mt-20 rounded-xl shadow-md" style={{ backgroundColor: "#2E073F" }}>
                    <Files />
                </div>
            </div>
        </div>
    );
}