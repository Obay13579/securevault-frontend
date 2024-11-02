import Image from "next/image";
import Ivan from "@/public/assets/ivan.jpg";
import Rio from "@/public/assets/rio.jpg";
import Irfan from "@/public/assets/irfan.jpg";
import Obi from "@/public/assets/obi.jpg";
import Link from "next/link";
import HomeLogin from "@/components/buttons/HomeLogin";
import Pp from "@/public/assets/pp.jpg"

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
                        <Link href="/sharing" className="p-2"> Shared </Link>
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
                            <li><Link href="/sharing">Shared</Link></li>
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
            <div className="flex-grow flex items-center justify-center font-[family-name:var(--font-now)]">
                <div className="flex flex-row flex-wrap justify-center items-stretch">
                    <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                        <div className="avatar justify-center mt-8">
                            <figure className="w-52 rounded-full">
                                <Image src={Ivan} alt="Ivan's Avatar" />
                            </figure>
                        </div>
                        <div className="card-body items-center text-center flex-grow">
                            <div className="mb-2 text-3xl">Muhammad Ivan Ardianadi Afiat</div>
                            <div className="m-2 text-2xl">5025221178</div>
                        </div>
                    </div>

                    <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                        <div className="avatar justify-center mt-8">
                            <figure className="w-52 rounded-full">
                                <Image src={Rio} alt="Rio's Avatar" />
                            </figure>
                        </div>
                        <div className="card-body items-center text-center flex-grow">
                            <div className="mb-2 text-3xl">Pradipta Arya Daniswara</div>
                            <div className="m-2 text-2xl">5025221185</div>
                        </div>
                    </div>

                    <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                        <div className="avatar justify-center mt-8">
                            <figure className="w-52 rounded-full">
                                <Image src={Irfan} alt="Irfan's Avatar" />
                            </figure>
                        </div>
                        <div className="card-body items-center text-center flex-grow">
                            <div className="mb-2 text-3xl">Irfan Ridhana</div>
                            <div className="m-2 text-2xl">5025221214</div>
                        </div>
                    </div>

                    <div className="card w-96 shadow-xl m-2 flex flex-col" style={{ backgroundColor: '#2E073F', minHeight: '400px' }}>
                        <div className="avatar justify-center mt-8">
                            <figure className="w-52 rounded-full">
                                <Image src={Obi} alt="Obi's Avatar" />
                            </figure>
                        </div>
                        <div className="card-body items-center text-center flex-grow">
                            <div className="mb-2 text-3xl">Nuril Qolbi <br /> Zam Zami</div>
                            <div className="m-2 text-2xl">5025221296</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
