import React, { ReactNode } from "react"

interface Props {
  children?: ReactNode
  classTitle?: string
  title?: string
  hero?: string
}

const Hero = ({ children, title, classTitle, hero }: Props) => (
  <section className={hero}>
    {title && <h1 className={"hero--title " + classTitle}>{title}</h1>}
    {children}
  </section>
)

Hero.defaultProps = {
  hero: "default-hero",
}

export default Hero
