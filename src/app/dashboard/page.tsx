import Image from "next/image";
import Header from "@/public/assets/1(1).png";
import Header2 from "@/public/assets/2(1).png";
import Link from "next/link";
import HomeLogin from "@/components/buttons/HomeLogin";
import Pp from "@/public/assets/pp.jpg";

export default function Home() {
  return (
    <div>
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
      <div className="w-full h-auto">
        <Image
          src={Header}
          alt="Header or Branding"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="w-full h-auto">
        <Image
          src={Header2}
          alt="Header or Branding"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
