import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"

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

const ProjectsPage = ({ data }: Props) => {
  // get all projects used to shorten
  const projects = data.projectsData.nodes

  // set categories
  const [category, setCategory] = useState(["all"])
  // search
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResutls, setSearchResutls] = useState(projects)
  // get unique categories
  let projectsCategories = getUnique(projects, "category")
  // add all
  projectsCategories = ["all", ...projectsCategories]

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

  const sortByCategory = (item) => {
    if (item.includes("all")) return projects

    return projects.filter((edge) =>
      edge.frontmatter.category.includes(...item)
    )
  }

  useEffect(() => {
    const results = sortByCategory(category).filter((project) =>
      project.frontmatter.title.toLowerCase().includes(searchTerm)
    )

    setSearchResutls(results)
  }, [searchTerm, category])

  return (
    <>
      <SEO title="Projects Page" />
      <Layout headerClasses="projects-header text-white">
        <Hero
          hero="projects-hero outer"
          title="Wildeving Projects"
          classTitle="layout"
        >
          <h2 className="site-description">
            Raising the standart of coding online.
          </h2>
        </Hero>
        <main id="site-main" className="site-main outer">
          <section className="filter-section">
            <div className="categories-filter-bar">
              <ul>
                {projectsCategories.sort().map((category, index) => (
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
          </section>
          <section className="section-blog py-4">
            <div className="inner">
              <div className="post-feed">
                {searchResutls.length ? (
                  searchResutls.map((project) => {
                    const preview =
                      project.frontmatter.featuredImage.childImageSharp.fluid
                    return (
                      <PostCard
                        key={project.id}
                        post={project}
                        imgSrc={preview}
                      />
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
  query ProjectsPageQuery {
    projectsData: allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: {
        frontmatter: { published: { eq: true }, layout: { eq: "projects" } }
      }
    ) {
      ...nodesParts
    }
  }
`
export default ProjectsPage
