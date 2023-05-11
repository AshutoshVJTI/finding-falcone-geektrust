import React from "react"
import { Link } from "react-router-dom"

import './header.css'

const Header = () => {

    const reset = () => {
        localStorage.removeItem('body')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg theme navbar-dark ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/' onClick={reset}>
                        <img src={`${process.env.REACT_APP_ASSETS_URL}/eagle_crosshair.png`} alt="logo" />
                        <span>
                            Finding Falcone
                        </span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/"
                                    onClick={reset}
                                >Reset</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="https://www.geektrust.com/coding/challenges" target={`_blank`}>Geektrust Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header