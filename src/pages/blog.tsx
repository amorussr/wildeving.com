import React, { useState, useEffect, useRef } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import PostCard from "../components/postCard"

interface Props {
  readonly data: PageQueryData
}

//utility: get all unique values
const getUnique = (items: any, type: string) => {
  return [
    ...new Set([...items.map((item) => item.frontmatter[type])].flat(Infinity)),
  ]
}

let currentLetter = ``

const BlogPage = ({ data }: Props) => {
  // get all articles used to shorten
  const articles = data.blogArticles.nodes
  // to detect is filter by tags menu opened or closed
  const [isOpen, setOpen] = useState(false)
  // set categories
  const [category, setCategory] = useState(["all"])
  // search
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState(articles)

  const [activeTags, setActiveTags] = useState([])

  // get unique categories
  let articleCategories = getUnique(articles, "category")
  // get unique tags
  let articleTags = getUnique(articles, "tags")
  // add all
  articleCategories = ["all", ...articleCategories]

  let uniqueGroups = [...new Set([...articleTags.sort().map((tag) => tag)])]

  // reset filtering by tags
  const tagRef = useRef(null)
  const clearTags = () => {
    setActiveTags([])
    if (tagRef !== null) {
      ;[...tagRef.current.children].map((tag) => tag.classList.remove("active"))
    }
  }

  const updateSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  // categories togle active class
  const updateCategory = (event) => {
    event.preventDefault()
    ;[...event.target.parentNode.parentNode.children].map((li) =>
      li.classList.remove("active")
    )

    event.target.parentNode.classList.add("active")
    setCategory([event.target.dataset.category])
  }

  // tags togle active class
  const toggleActive = (event) => {
    let tagName = event.target.dataset.tag

    if (event.target.classList.contains("active")) {
      event.target.classList.remove("active")
      let newArr = activeTags.filter((tag) => tag !== tagName)
      setActiveTags([...newArr])
    } else {
      event.target.classList.add("active")
      setActiveTags([...activeTags, tagName])
    }
  }

  const sortByCategory = (item) => {
    if (item.includes("all")) return articles

    return articles.filter((edge) =>
      edge.frontmatter.category.includes(...item)
    )
  }

  const sortByTags = (item) => {
    let total = []

    if (activeTags.length === 0) return item

    for (let i in activeTags) {
      let tag = activeTags[i]
      total.push(...item.filter((post) => post.frontmatter.tags.includes(tag)))
    }
    total = [...new Set(total)]
    return total
  }

  useEffect(() => {
    let results = sortByCategory(category).filter((article) =>
      article.frontmatter.title.toLowerCase().includes(searchTerm)
    )
    results = sortByTags(results)

    setSearchResults(results)
  }, [searchTerm, category, activeTags])

  return (
    <>
      <SEO title="Blog Page" />
      <Layout headerClasses="bg-blue">
        <Hero hero="blog-hero outer" title="Wildeving Blog" classTitle="layout">
          <h2 className="site-description">
            Raising the standart of trust online.
          </h2>
        </Hero>
        <main id="site-main" className="site-main outer">
          <section className="filter-section">
            <div className="categories-filter-bar">
              <ul>
                {articleCategories.sort().map((category, index) => (
                  <li
                    key={index}
                    className={`category ${
                      category.includes("all") && "active"
                    }`}
                  >
                    <a
                      href={"#category-" + category.toLowerCase()}
                      data-category={category.trim().toLowerCase()}
                      onClick={updateCategory}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="search-input-wrapper float-l">
              <input
                id="post-search-input"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={updateSearch}
              />
              <div
                id="clear-search-btn"
                className="clear-search"
                style={searchTerm ? { display: "block" } : { display: "none" }}
                onClick={clearSearch}
              ></div>
            </div>
            <div
              id="post-tags-filter-btn"
              className="primary-btn dark float-r"
              onClick={() => setOpen(!isOpen)}
            >
              Filter by tags
              <p
                className="tag-number"
                style={
                  activeTags.length > 0
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                {activeTags.length}
              </p>
            </div>
          </section>
          <div
            id="tag-filter-panel"
            className="tag-filter-panel"
            style={{ right: isOpen ? "0" : "-120%" }}
          >
            <div className="tag-filter-panel-header">
              <div className="tag-filter-panel-header-text-wrapper">
                <h2>Filter by tags</h2>
                <div className="info-text-grey">
                  Select tags to filter the posts
                </div>
              </div>
              <div
                id="tag-filter-panel-close-btn"
                className="close-btn"
                onClick={() => setOpen(!isOpen)}
              ></div>
            </div>
            <div className="selected-tags-counter active">
              <p id="tag-counter-label" className="tag-counter-label">
                <span>{activeTags.length}</span>
                {` `} tags selected
              </p>
              <p id="tag-clear-btn" className="link-btn" onClick={clearTags}>
                Clear
              </p>
            </div>
            <div id="tags-content-wrapper" className="tags-content-wrapper">
              <div className="simplebar-content" ref={tagRef}>
                {articleTags.length > 0 ? (
                  articleTags.map((tag, index) => {
                    const firstLetter = uniqueGroups[index]
                      .charAt(0)
                      .toLowerCase()
                    const buildTag = (
                      <div
                        key={index}
                        className="tag"
                        data-tag={tag}
                        onClick={toggleActive}
                      >
                        {tag}
                      </div>
                    )

                    if (currentLetter !== firstLetter) {
                      currentLetter = firstLetter
                      return (
                        <React.Fragment key={`letterheader-${currentLetter}`}>
                          <h2>{currentLetter.toUpperCase()}</h2>
                          {buildTag}
                        </React.Fragment>
                      )
                    }
                    return buildTag
                  })
                ) : (
                  <h4> No tags </h4>
                )}
              </div>
            </div>
          </div>
          <section className="section-blog py-4">
            <div className="inner">
              <div className="post-feed">
                {searchResults.length ? (
                  searchResults.map((post) => {
                    const preview =
                      post.frontmatter.featuredImage.childImageSharp.fluid

                    return (
                      <PostCard key={post.id} post={post} imgSrc={preview} />
                    )
                  })
                ) : (
                  <div className="search-empty-state">
                    <p className="l-font-size">
                      Sorry we couldn't find any matches for your search
                    </p>
                    <p className="m-font-size grey">
                      Please try searching with another term
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  )
}

interface PageQueryData {
  allMarkdownRemark: {
    nodes: {
      id: number
      frontmatter: {
        category: []
        date: string
        description: string
        layout: []
        title: string
        tags: []
      }
    }
  }
}

export const pageQuery2 = graphql`
  fragment nodesParts on MarkdownRemarkConnection {
    nodes {
      id
      frontmatter {
        category
        date
        description
        layout
        title
        tags
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
    }
  }

  query BlogPageQuery {
    blogArticles: allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: {
        frontmatter: { published: { eq: true }, layout: { eq: "articles" } }
      }
    ) {
      ...nodesParts
    }
  }
`

export default BlogPage
