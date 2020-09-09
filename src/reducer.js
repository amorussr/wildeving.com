export default function (state, action) {
  switch (action.type) {
    case "TOGGLE_ACTIVE":
      state.categories.map((item) => (item.isActive = false))
      state.workList.map((list) => (list.isShowed = false))
      state.workList.map((list) => {
        if (action.event.target.dataset.group.indexOf("All") !== -1) {
          list.isShowed = true
        } else if (list.title === action.event.target.dataset.group.trim()) {
          list.isShowed = true
        }
      })
      return {
        ...state,
        ...(action.field.isActive = true),
      }
    default:
      return { state }
  }
}
