import React, { useRef, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { ParallaxProvider } from "react-scroll-parallax"
import { Parallax } from "react-scroll-parallax"
import BackgroundImage from "gatsby-background-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Hero from "../components/hero"
import PostCard from "../components/postCard"

interface Props {
  readonly data: PageQueryData
}

const IndexPage = ({ data }: Props) => {
  const mainRef = useRef(0)
  const blogRef = useRef(0)
  const projectsRef = useRef(0)
  const contactsRef = useRef(0)

  const spaceGray = "#f4f8fb linear-gradient(to bottom, #f4f8fb, #e0eafc)"
  const colorsOfSky = "#e0eafc linear-gradient(to bottom, #e0eafc, #cfdef3)"
  const contactBgWhite = "#f4f8fb"

  const nimvelo = "linear-gradient(to right, #314755, #26a0da)"
  const seaBlue = "linear-gradient(to left, #2b5876, #4e4376)"

  useEffect(() => {
    const observer = (mycolor: string) =>
      new IntersectionObserver((entries) => {
        entries.map((entry) => {
          if (entry.isIntersecting === true)
            mainRef.current.style.background = mycolor
        })
      })

    observer(spaceGray).observe(blogRef.current)
    observer(colorsOfSky).observe(projectsRef.current)
    observer(nimvelo).observe(projectsRef.current.children[1])
    observer(seaBlue).observe(projectsRef.current.children[2])
    observer(contactBgWhite).observe(contactsRef.current)
  }, [])

  return (
    <>
      <SEO title="Home" />
      <ParallaxProvider>
        <Layout headerClasses="cloudyknoxville">
          <Hero title="Hit the waves" classTitle="layout">
            <p>Welcome to my personal blog</p>
            <Link
              to="/contacts/"
              className="btn primary-btn cta-btn cta-btn-filled"
            >
              Contact me
            </Link>
            <Link to="/blog/" className="btn primary-btn cta-btn">
              Read Blog
            </Link>
          </Hero>
          <main ref={mainRef} id="site-main" className="site-main">
            <Parallax y={[0, -25]}>
              <section ref={blogRef} className="section-blog py-4 outer">
                <div className="inner">
                  <h2 className="section--title">Blog</h2>
                  <div className="post-feed">
                    {data.blogArticles.nodes.slice(0, 7).map((post) => {
                      const preview =
                        post.frontmatter.featuredImage.childImageSharp.fluid

                      return (
                        <PostCard key={post.id} post={post} imgSrc={preview} />
                      )
                    })}
                  </div>
                  <Link className="goto-links" to="/blog/">
                    All posts
                  </Link>
                </div>
              </section>
            </Parallax>
            <Parallax y={[0, -55]}>
              <section
                ref={projectsRef}
                className="section-projects py-4 outer"
              >
                <h2 className="section--title">Projects</h2>
                {data.projectsData.nodes.map((project, index) => {
                  const preview =
                    project.frontmatter.featuredImage.childImageSharp.fluid

                  return (
                    <Parallax y={[0, -5]} key={index}>
                      <article
                        className={`project-card project-${project.frontmatter.title.toLowerCase()}`}
                        key={project.id}
                      >
                        <BackgroundImage
                          className="project__img-wrap"
                          fluid={preview}
                          style={{
                            backgroundSize: "contain",
                          }}
                        />
                        <div className="project__content-wrap">
                          <div className="project__desc">
                            <h3 className="project__title">
                              {project.frontmatter.title}
                            </h3>
                            <p className="project__subtitle">Some subtitle</p>
                            <ul className="project__tags tags-list">
                              {project.frontmatter.tags.map((tag) => (
                                <li
                                  key={`project-${tag}`}
                                  className="tags-list__item"
                                >
                                  <span className="tags-list__tag">{tag}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="project__content">
                              {project.frontmatter.description}{" "}
                            </p>
                            <Link
                              to={project.fields.slug}
                              className="project-btn btn--bordered btn--white btn--arrow"
                            >
                              See full case study
                            </Link>
                          </div>
                        </div>
                      </article>
                    </Parallax>
                  )
                })}
                <Link className="goto-links" to="/projects/">
                  All projects
                </Link>
              </section>
            </Parallax>
            <section className="section-about py-4 outer">
              <h2 className="section--title">About</h2>
              <h4 style={{ color: "#777", textAlign: "center" }}>
                This website was created by{" "}
                <a href="https://www.gatsbyjs.com" style={{ color: "#ffae1e" }}>
                  Gatsby JS
                </a>
              </h4>
              <div
                style={{
                  maxWidth: `300px`,
                  margin: `3.5rem auto`,
                }}
              >
                <Image />
              </div>
              <Link className="goto-links" to="/about/">
                Visit about page
              </Link>
            </section>
            <Parallax y={[0, -5]}>
              <section
                ref={contactsRef}
                className="section-contacts py-4 outer"
              >
                <div className="layout">
                  <div className="content">
                    <h2 className="section--title">Get to know me!</h2>
                    <p className="section--intro">
                      It's pleasure to have you on my website. Let us know if
                      there's an opportunity for us to do something toghether.
                    </p>
                    <form
                      name="contact"
                      method="POST"
                      data-netlify="true"
                      className="contact-form-container"
                    >
                      <h1>Send me a message</h1>
                      <p>
                        Fell free to get in touch with me with anything related
                        to Wildeving or you can just say hi I will get back to
                        you as soon as I can.
                      </p>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          name="name"
                          className="contact-name--input border--input"
                          placeholder="Name"
                        />
                        <p className="contact-name--input--error input--error--msg">
                          Please enter your name
                        </p>
                      </div>
                      <div className="input-wrapper">
                        <input
                          type="email"
                          name="email"
                          className="contact-email--input border--input"
                          placeholder="Email"
                        />
                        <p className="contact-email--input--error input--error--msg">
                          Please enter a vaild email address
                        </p>
                      </div>
                      <div className="input-wrapper">
                        <input
                          type="text"
                          name="subject"
                          className="contact-subject--input border--input"
                          placeholder="Subject"
                        />
                        <p className="contact-subject--input--error input--error--msg">
                          Please enter a subject
                        </p>
                      </div>
                      <div className="input-wrapper">
                        <textarea
                          type="text"
                          name="message"
                          rows="5"
                          className="contact-message--input border--input"
                          placeholder="Message"
                        ></textarea>
                        <p className="contact-message--input--error input--error--msg">
                          Please write a message
                        </p>
                      </div>
                      <button
                        style={{ border: "none" }}
                        type="submit"
                        className="btn btn--primary"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </section>
            </Parallax>
          </main>
        </Layout>
      </ParallaxProvider>
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

export const pageQuery = graphql`
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
  query HomePageQuery {
    blogArticles: allMarkdownRemark(
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
      filter: {
        frontmatter: { published: { eq: true }, layout: { eq: "articles" } }
      }
    ) {
      ...nodesParts
    }
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

export default IndexPage
