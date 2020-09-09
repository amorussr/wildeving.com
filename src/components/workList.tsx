import React from "react"
import WorkItem from "./workItem"

export default function WorkList({ works }) {
  return works.map((work) => {
    if (work.isShowed) {
      return (
        <React.Fragment key={work.id}>
          <div className="works-row">
            <h5>{work.title}</h5>
            <div className="works-item-wrap">
              <WorkItem items={work.workItems} />
            </div>
          </div>
        </React.Fragment>
      )
    }
  })
}
