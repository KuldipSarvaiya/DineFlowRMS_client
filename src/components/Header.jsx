import React from "react";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-between">
        <a
          href="/"
          className="logo d-flex align-items-center me-auto me-lg-0"
        >
          <img src="assets/img/logo.png" alt="" />
          <h1>
            DineFlow<span>.</span>
          </h1>
        </a>

        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <a href="#hero">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li> 
            <li>
              <a href="#chefs">Chefs</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        <a className="btn-book-a-table" href="#book-a-table">
          Book a Table
        </a>
        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      </div>
    </header>
  );
}

export default Header;
