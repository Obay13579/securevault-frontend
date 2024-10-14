import Link from "next/link";
import Image from "next/image";
import HomeLogin from "@/components/buttons/HomeLogin";
import Pp from "@/public/assets/pp.jpg";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#7A1CAC" }}>
            <div style={{ backgroundColor: '#2E073F' }} className="navbar font-[family-name:var(--font-now)]">
                <div className="navbar-start">
                    <HomeLogin/>
                </div>
                <div className="navbar-center flex">
                    <div className="text-xl hidden sm:flex">
                        <Link href="/upload" className="p-2"> Upload </Link>
                        <Link href="/gallery" className="p-2"> Galleries </Link>
                        <Link href="/about" className="p-2"> About Us </Link>
                    </div>
                    <div className="dropdown sm:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="text-gray-200 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            style={{ backgroundColor: "#7A1CAC" }}
                        >
                            <li><Link href="/upload">Upload</Link></li>
                            <li><Link href="/gallery">Galleries</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                        </ul>
                        </div>
                    </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                            <Image
                                src={Pp}
                                alt="User Avatar"
                            />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="text-gray-200 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            style={{ backgroundColor: '#2E073F' }}
                        >
                            <li>
                                <Link href="/profile" className="justify-between">Profile</Link>
                            </li>
                            <li>
                                <Link href="/">  
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>         
            </div>
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
