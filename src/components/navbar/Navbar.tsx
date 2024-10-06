import React from "react";
import Register from "../buttons/Register";
import Login from "../buttons/Login";
import Home from "../buttons/Home";

const Navbar = () => {
    return (
        <div className="navbar font-[family-name:var(--font-now)]" style={{ backgroundColor: '#2E073F' }}>
            <div className="navbar-start">
                <div>
                    <Home/>
                </div>
            </div>
            <div className="navbar-end">
                <div>
                    <Login />
                </div>
                <div>
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default Navbar;