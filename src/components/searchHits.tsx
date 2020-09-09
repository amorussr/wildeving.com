import React, { useContext, useRef, useEffect } from "react"
import { Link } from "gatsby"

import { MainContext } from "../MainContext"

const SearchHits = () => {
  const [
    allData,
    searchResults,
    setSearchResults,
    hitsRefState,
    setHitsRefState,
  ] = useContext(MainContext)

  const hitsRef = useRef(null)

  const getPosts = (type) =>
    searchResults.filter((edge) => edge.node.frontmatter.layout === type)

  const articles = getPosts("articles")
  const projects = getPosts("projects")

  const getUnique = (items, type) => {
    return [...new Set(items.map((item) => item.node.frontmatter[type]))]
  }

  const uniqueLayouts = getUnique(searchResults, "layout")

  let currentLayout = ``

  useEffect(() => {
    setHitsRefState(hitsRef)
  }, [hitsRefState])

  return (
    <div
      ref={hitsRef}
      id="search-hits"
      className="search-hits"
      style={{ display: "none" }}
    >
      {uniqueLayouts.length > 0 ? (
        uniqueLayouts.map((layout, index) => {
          const firstLayout = uniqueLayouts[index]
          const buildLayout = (type) => (
            <div key={index} className={"layout-wrap layout-" + currentLayout}>
              {type.map((item) => (
                <article
                  className="layout-card"
                  key={`layoutId-${item.node.id}`}
                >
                  <Link
                    key={`linkId-${item.node.id}`}
                    to={item.node.fields.slug}
                    className="layout-card-content-link"
                  >
                    {item.node.frontmatter.title}
                  </Link>

                  <small
                    className={"layout-card-data"}
                    key={`dataId-${item.node.id}`}
                  >
                    {new Date(
                      Date.parse(item.node.frontmatter.date)
                    ).toDateString()}
                  </small>
                </article>
              ))}
            </div>
          )

          if (currentLayout !== firstLayout) {
            currentLayout = firstLayout
            return (
              <React.Fragment key={`layoutname-${currentLayout}`}>
                <h4 className={"layout-title layout-" + currentLayout}>
                  {currentLayout}
                </h4>
                {buildLayout(getPosts(currentLayout))}
              </React.Fragment>
            )
          }

          return buildTag
        })
      ) : (
        <h4 className="layout-title">Uuuups! No items found...</h4>
      )}
    </div>
  )
}

export default SearchHits
