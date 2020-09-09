/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from "react"

import { MainProvider } from "../MainContext"
import Header from "./header"
import "./layout.css"

import NavbarMobile from "./navbarMobile"
import SearchHits from "./searchHits"

interface Props {
  children: ReactNode
  headerClasses?: string
}

const Layout = ({ children, headerClasses }: Props) => {
  // TODO: if Header of Footer will change, i will deside to leave footer here or contain footer to anoterh component

  return (
    <>
      <MainProvider>
        <Header headerClasses={headerClasses || ""} />
        <SearchHits />
        {children}
        <footer className="site-footer">
          <div className="layout">
            <div className="content">
              <p className="copyright">
                © Wildeving {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </footer>
        <NavbarMobile />
      </MainProvider>
    </>
  )
}

export default Layout
