import React from "react";

import { Link } from 'react-router-dom';

const Header = () => {
  return (
      <header className='header'>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="navbar-header d-flex align-items-center justify-content-between">
              <a href="#" className="navbar-brand">Hodinkee Blog</a>
            </div>
            <div id="navbarcollapse" className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link active ">Home</Link>
                </li>
                {/*<li className="nav-item">*/}
                {/*  <a href="#" className="nav-link">Blog</a>*/}
                {/*</li>*/}
                {/*<li className="nav-item">*/}
                {/*  <a href="#" className="nav-link ">Post</a>*/}
                {/*</li>*/}
              </ul>
            </div>
          </div>
        </nav>
      </header>
  );
};

export default Header;