import React from 'react';
import './App.css';
import Login from "./components/Login"

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: null,
      loginForm: {
        email: "",
        password: ""
      }
    }
  }

  handleLoginFormChange = event => {
    const {name,value} = event.target
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [name]: value
      }
    })
  }

  handleLoginFormSubmit = event => {
    event.preventDefault()
    // now I need to submit the info from the form to the back end
    // ... where I will authenticate the user, and if valid, send the user back
    // with that response, set my state, all is glorious with the world

    // how do I build a fetch request if I am sending a bunch of information?
    const userInfo = this.state.loginForm
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: userInfo
      })
    }
    fetch("http://localhost:3000/login", headers)
      .then(r => r.json())//need to call .json to turn this thing into something readable
      .then(userJSON => {
        // userJSON -
        if (userJSON.error) {
          // failure
          alert("invalid credentials")
        } else {
          // success
          this.setState({
            currentUser: userJSON.user
          })
        }
      })
      .catch(console.log)
  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="App">
        <h2>{ currentUser ?
          `Logged in as ${currentUser.name}` :
          "Not logged in"
        }</h2>
        <Login
          handleLoginFormChange={this.handleLoginFormChange}
          handleLoginFormSubmit={this.handleLoginFormSubmit}
          email={this.state.loginForm.email}
          password={this.state.loginForm.password}
        />
      </div>
    );
  }
}

export default App;

// Auth Lecture June 03 2019 ^^^ will come out as a string thanks to jsx
// Q on Find:
//.. what will happen with Find if nothing is found?
//.. crashes
