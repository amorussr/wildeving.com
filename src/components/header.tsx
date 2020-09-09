import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { MdLanguage } from "react-icons/md"
import { FaMoon } from "react-icons/fa"
import Navbar from "./navbar"

interface Props {
  headerClasses?: string
}
const Header = ({ headerClasses }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "images/gatsby-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <header className={"global-header " + headerClasses}>
      <div className="global-navbar">
        <Link className="logo" to="/">
          <Img
            className="logo-img"
            fluid={data.placeholderImage.childImageSharp.fluid}
          />
          <div>
            <span>Wildeving</span>
          </div>
        </Link>
        <Navbar />
        <div className="global-navbar--tools">
          <div className="lang-mode">
            <MdLanguage />
          </div>
          <div className="theme-mode">
            <FaMoon />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
