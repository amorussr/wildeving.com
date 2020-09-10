import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import ContactForm from "../components/contactForm"

const ContactsPage = () => (
  <>
    <SEO title="Contacts Page" />
    <Layout headerClasses="contacts-header text-white">
      <Hero hero="contacts-hero" classTitle="layout">
        <div className="layout">
          <div className="content">
            <div className="hero-container">
              <div className="hero--title">
                <p>Wildeving</p>
              </div>
              <span className="separator"></span>
              <div className="hero--subtitle">
                <p>Designing</p>
                <p>Developing</p>
                <p>Maintaining</p>
              </div>
            </div>
          </div>
        </div>
      </Hero>
      <ContactForm />
    </Layout>
  </>
)

export default ContactsPage
