import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./index.css";

function Nav() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [navSearch, setNavSearch] = useState("");
  const { pathname } = useLocation();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-0">
      <div className="container-fluid wd-green p-2">
      <Link to="/home" className="navbar-brand" href="#"> Filler Name </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link wd-green"> Home </Link>
            </li>
            {!currentUser && (
            <>
              <li className="nav-item">
                <Link to="/signin" className="nav-link"> SignIn </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link"> SignUp </Link>
              </li>
            </>
          )}
          {currentUser && (
          <>
            <li className="nav-item">
              <Link to="/account" className="nav-link"> Account </Link>
            </li>
            {currentUser.role === "ADMIN" && (
              <li className="nav-item">
                <Link to="/users" className="nav-link"> Users </Link>
              </li>
            )}
          </>
          )}
          </ul>
          {!pathname.includes("search") && (
          <>
            <form className="d-flex" role="search">
              <div className="wd-wrap">
                <div className="wd-search">
                    <input type="searchTerm" className="wd-searchTerm" placeholder="Search"
                      value={navSearch} onChange={(e) => setNavSearch(e.target.value)}/>
                    <Link className="wd-searchButton" to= "/search" state= {navSearch} onClick={(e) => setNavSearch("")}> <FaMagnifyingGlass /> </Link>
                </div>
              </div>
            </form>
          </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
