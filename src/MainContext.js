import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

export const MainContext = React.createContext()

export const MainProvider = ({ children }) => {
  const data = useStaticQuery(graphql`
    query navbarQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              category
              date
              description
              layout
              title
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // allData used to shorten
  const allData = data.allMarkdownRemark.edges
  // searchResults for navbar-mobile--bottom
  const [searchResults, setSearchResults] = useState(allData)

  const [hitsRefState, setHitsRefState] = useState(null)

  return (
    <MainContext.Provider
      value={[
        allData,
        searchResults,
        setSearchResults,
        hitsRefState,
        setHitsRefState,
      ]}
    >
      {children}
    </MainContext.Provider>
  )
}
