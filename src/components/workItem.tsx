import React from "react"

export default function WorkItem({ items }) {
  return items.map((item) => (
    <p key={item.id} className="works--item">
      {item.id}. {item.itemSource}
    </p>
  ))
}
