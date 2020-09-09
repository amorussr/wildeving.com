import React from "react"
import { Link } from "gatsby"

const Navbar = () => (
  <nav className="main-nav">
    <Link
      to="/blog/"
      className="main-nav--link"
      activeClassName="main-nav--link--active"
    >
      Blog
    </Link>
    <Link
      to="/projects/"
      className="main-nav--link"
      activeClassName="main-nav--link--active"
    >
      Projects
    </Link>
    <Link
      to="/about/"
      className="main-nav--link"
      activeClassName="main-nav--link--active"
    >
      About
    </Link>
    <Link
      to="/contacts/"
      className="main-nav--link"
      activeClassName="main-nav--link--active"
    >
      Contacts
    </Link>
  </nav>
)

export default Navbar
