export const setUser = user => {
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

//async action creator

export const getCurrentUser = credentials => {
  return dispatch => {
    return fetch()
  }
}
