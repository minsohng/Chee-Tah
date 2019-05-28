import * as React from 'react';
import Form from './Form';

const Navbar = () => {
  return (
    <>
      <nav className="navbar i level">
        <span className="navbar-toggle" id="js-navbar-toggle">
            <i className="fas fa-bars"></i>
        </span>
        {/* <form id="search" className="Search">
          <input type="search" placeholder="Search for a title..." />
        </form> */}
        <a href="/" className="logo"><img style={{borderRadius:'50%'}} src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/5771736/600/400/m2/fpnw/wm0/logo76-.jpg?1548586051&s=9710bd94971f15cab62d0116acbebcb4" /></a>
        <Form/>
        <ul className="main-nav" id="js-menu">
          <li>
              <a href="#" className="nav-links">Input</a>
          </li>
          <li>
              <a href="#" className="nav-links">Input</a>
          </li>
          <li>
              <a href="#" className="nav-links">About Us</a>
          </li>
          <li>
              <a href="#" className="nav-links">Input</a>
          </li>
          <li>
              <a href="#" className="nav-links">Input</a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar;