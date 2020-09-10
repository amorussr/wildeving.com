import React, { useState, useEffect, useContext, useRef } from "react"
import { Link } from "gatsby"

import { MainContext } from "../MainContext"
import { FiFeather } from "react-icons/fi"
import { FcWorkflow } from "react-icons/fc"
import { BsPerson } from "react-icons/bs"
import { FiMail } from "react-icons/fi"

const NavbarMobile = () => {
  // allData used to shorten
  const [allData, searchResults, setSearchResults, hitsRefState] = useContext(
    MainContext
  )
  // search
  const [searchTerm, setSearchTerm] = useState("")

  const navbarMobileRef = useRef(null)

  const toggleHits = (hits) => {
    if (hits.style.display === "block") hits.style.display = "none"
    return (hits.style.display = "block")
  }

  const handleFocus = () => {
    const links = [...navbarMobileRef.current.children].filter(
      (el) => el.localName === "a"
    )
    links.map((link) => link.classList.add("collapsed"))

    toggleHits(hitsRefState.current)
  }

  const handleBlur = (event) => {
    event.stopPropagation()
    const links = [...navbarMobileRef.current.children].filter(
      (el) => el.localName === "a"
    )
    links.map((link) => link.classList.remove("collapsed"))

    toggleHits(hitsRefState.current)

    setSearchTerm("")
  }

  const updateSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    let results = allData.filter((article) =>
      article.node.frontmatter.title.toLowerCase().includes(searchTerm)
    )
    setSearchResults(results)
  }, [searchTerm])

  return (
    <nav ref={navbarMobileRef} className="navbar-mobile--bottom">
      <Link to="/blog" activeClassName="navbar-active" partiallyActive={true}>
        <span>
          <FiFeather />
        </span>
        <div className="navbar-title">Blog</div>
      </Link>
      <Link
        to="/projects"
        activeClassName="navbar-active"
        partiallyActive={true}
      >
        <span>
          <FcWorkflow />
        </span>
        <div className="navbar-title">Projects</div>
      </Link>
      <Link to="/about" activeClassName="navbar-active" partiallyActive={true}>
        <span>
          <BsPerson />
        </span>
        <div className="navbar-title">About</div>
      </Link>
      <Link
        to="/contacts"
        activeClassName="navbar-active"
        partiallyActive={true}
      >
        <span>
          <FiMail />
        </span>
        <div className="navbar-title">Contacts</div>
      </Link>
      <input
        type="text"
        value={searchTerm}
        className="searchBox"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={updateSearch}
      />
    </nav>
  )
}

export default NavbarMobile
