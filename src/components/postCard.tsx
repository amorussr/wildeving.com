import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

const PostCard = ({ post, imgSrc }) => {
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
    <article className="post-card">
      <Link to={post.fields.slug} className="post-card-image-link">
        <BackgroundImage
          tag={`div`}
          className="post-card-image"
          fluid={imgSrc}
        />
      </Link>
      <div className="post-card-content">
        <Link to={post.fields.slug} className="post-card-content-link">
          <header className="post-card-header">
            <ul className="post-card-tags">
              {post.frontmatter.tags &&
                post.frontmatter.tags.map((tag, index) => (
                  <li key={index}>
                    <span className="post-card-tag">{tag}</span>
                  </li>
                ))}
            </ul>
            <h3 className="post-card-title">{post.frontmatter.title}</h3>
            <ul className="post-card-categories">
              {post.frontmatter.category.map((categoryItem, index) => (
                <li
                  key={index}
                  style={{
                    margin: "20px auto",
                    color: "teal",
                    textTransform: "capitalize",
                  }}
                >
                  <span className="post-card-category">{categoryItem}</span>
                </li>
              ))}
            </ul>
          </header>
          <section className="post-card-excerpt">
            <p>{post.frontmatter.description}</p>
            <small>
              Posted at{" "}
              {new Date(Date.parse(post.frontmatter.date)).toDateString()}
            </small>
          </section>
        </Link>
        <footer className="post-card-meta">
          <ul className="author-list">
            <li className="author-list-item">
              <a href="#" className="static-avatar">
                <Img
                  fluid={data.placeholderImage.childImageSharp.fluid}
                  alt="author-img"
                  className="author-profile-image"
                />
              </a>
            </li>
          </ul>
          <span className="reading-time">4 min read</span>
        </footer>
      </div>
    </article>
  )
}

export default PostCard
