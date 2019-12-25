export const setCurrentUser = ({user}) => {//an action creator to set my user
  return {
    type: "SET_CURRENT_USER",
    user
  }
}

//async action creator

export const getCurrentUser = userCredentials => { //an action creator to get my user
  return dispatch => {
    return fetch("http://localhost:3001/get_current_user", {
            // including credentials in the fetch request grabs stuff from the session in the browser and transport that back to the server
            credentials: "include", // -> with every request that is coming back from the front end combined with credentials: true and origins 'localhost:3000'
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(r => r.json())
            .then(resp => {
              if (resp.error) {
                alert(resp.error)
              } else {
                dispatch(setCurrentUser(resp))
              }
            })
            .catch(console.log)

  }
}
