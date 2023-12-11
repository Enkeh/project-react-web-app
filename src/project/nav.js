import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "./images/ChanneleonBanner.png";
import logoMini from "./images/ChanneleonBannerMini.png";
import "./index.css";

function ProjectNav() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [navSearch, setNavSearch] = useState("");
  const { pathname } = useLocation();
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary wd-green p-0 mr-auto" data-bs-theme="dark">
      <Navbar.Brand className="p-0" href="#/home"><img srcset={logoMini + " 991w, " + logo + " 2000w"} style={{height:"80px"}} alt="Channeleon" /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{marginRight: "20px"}}/>
      <Navbar.Collapse id="responsive-navbar-nav" style={{marginLeft: "20px"}}>
        <Nav className="me-auto">
        <li className="nav-item">
            <Link to="/home" className="nav-link"> Home </Link>
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
            <Link to="/profile" className="nav-link"> Profile </Link>
          </li>
          {currentUser.role === "ADMIN" && (
            <li className="nav-item">
              <Link to="/users" className="nav-link"> Users </Link>
            </li>
          )}
        </>
        )}
        </Nav>
        <Nav>
        {!pathname.includes("search") && (
        <>
          <form className="d-flex" role="search">
            <div className="wd-wrap">
              <div className="wd-search">
                  <input type="searchTerm" className="wd-searchTerm" placeholder="Search"
                    value={navSearch} onChange={(e) => setNavSearch(e.target.value)}/>
                  <Link className="wd-searchButton" to= {"/search/" + navSearch + "/1"} onClick={() => setNavSearch("")}> <FaMagnifyingGlass /> </Link>
              </div>
            </div>
          </form>
        </>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
} 

export default ProjectNav;
