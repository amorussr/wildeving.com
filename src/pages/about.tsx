import React, { useReducer } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Hero from "../components/hero"
import Layout from "../components/layout"
import WorkList from "../components/workList"
import SEO from "../components/seo"
import reducer from "../reducer"

const AboutPage = () => {
  const aboutHero = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "images/about-hero.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const initialState = {
    categories: [
      { id: 1, title: "All", isActive: true },
      { id: 2, title: "Art", isActive: false },
      { id: 3, title: "Design", isActive: false },
      { id: 4, title: "Code", isActive: false },
      { id: 5, title: "Images", isActive: false },
      { id: 6, title: "Music", isActive: false },
      { id: 7, title: "Videos", isActive: false },
    ],

    workList: [
      {
        id: 1,
        title: "Art",
        isShowed: true,
        workItems: [
          { id: 1, itemSource: "empty art" },
          { id: 2, itemSource: "empty art 2" },
        ],
      },
      {
        id: 2,
        title: "Design",
        isShowed: true,
        workItems: [
          { id: 1, itemSource: "empty design" },
          { id: 2, itemSource: "empty design 2" },
        ],
      },
      {
        id: 3,
        title: "Code",
        isShowed: true,
        workItems: [
          { id: 1, itemSource: "empty code" },
          { id: 2, itemSource: "empty code 2" },
        ],
      },
      {
        id: 4,
        title: "Images",
        isShowed: true,
        workItems: [
          { id: 1, itemSource: "empty images" },
          { id: 2, itemSource: "empty images 2" },
        ],
      },
      {
        id: 5,
        title: "Music",
        isShowed: true,
        workItems: [
          { id: 1, itemSource: "empty music" },
          { id: 2, itemSource: "empty music 2" },
        ],
      },
      {
        id: 6,
        title: "Videos",
        isShowed: true,
        workItems: [
          { id: 1, itemSource: "empty video" },
          { id: 2, itemSource: "empty video 2" },
        ],
      },
    ],
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <SEO title="About Page" />
      <Layout headerClasses="about-header">
        <Hero hero="about-hero" title="About Me" classTitle="layout">
          <div className="hero-image-wrap">
            <div
              className="layout"
              style={{ paddingLeft: "2em", paddingRight: "2em" }}
            >
              <div className="content" style={{ width: "75%" }}>
                <Img fluid={aboutHero.placeholderImage.childImageSharp.fluid} />
              </div>
            </div>
          </div>
        </Hero>
        <main id="site-main" className="site-main outer">
          <section className="about-me layout--half-margin">
            <div className="layout">
              <div className="content">
                <p>
                  This page is under development. I am @amorussr and I am a
                  developer. Also I am interested in GNU/Linux and Raspberry Pi.
                </p>
              </div>
            </div>
          </section>

          <section className="container">
            <div className="works-list">
              <h2 className="works-list--title">My works</h2>
              <div className="filter-controls">
                <ul className="tablinks">
                  {state.categories
                    ? state.categories.map((item) => (
                        <li key={item.id} className="category">
                          <a
                            href="#"
                            className={`${item.isActive ? "active" : ""}`}
                            data-group={`${item.title} ${
                              item.isActive ? "acitve" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault()
                              e.persist()
                              return dispatch({
                                type: "TOGGLE_ACTIVE",
                                field: item,
                                event: e,
                              })
                            }}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))
                    : "hello"}
                </ul>
              </div>

              <div className="works-container">
                <WorkList works={state.workList} />
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  )
}

export default AboutPage
