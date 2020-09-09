import React from "react"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"

const searchClient = algoliasearch(
  "F5E3V743WR",
  "e7699f29d26ebc822e26bd9fd73d738c"
)

const SearchBar = () => (
  <InstantSearch searchClient={searchClient} indexName="demo_ecommerce">
    <SearchBox
      onFocus={() => {
        let items = document.querySelectorAll(".navbar-mobile--bottom > a")
        items.forEach((items) => items.classList.add("collapsed"))
      }}
      onBlur={() => {
        let items = document.querySelectorAll(".navbar-mobile--bottom > a")
        items.forEach((items) => items.classList.remove("collapsed"))
      }}
    />
    <Hits />
  </InstantSearch>
)

export default SearchBar
