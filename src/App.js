import React from 'react';
import './App.css';
import Secrets from './components/Secrets.js'
import Login from "./components/Login"

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      currentUser: null,
      loginForm: {
        email: "",
        password: ""
      },
      secrets: []
    }
  }

// can be /check_login_status or /auth
  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3001/get_current_user", {
        headers: {
          "Authorization": token
        }
      })
        .then(r => r.json())
        .then(console.log)
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
    fetch("http://localhost:3001/login", headers)
      .then(r => r.json())//need to call .json to turn this thing into something readable
      .then(resp => {
        // userJSON -
        if (resp.error) {
          // failure
          //debugger
          alert("invalid credentials")
        } else {
          // success
          this.setState({
            currentUser: resp.user
          })
          localStorage.setItem('token', resp.jwt)
        }
      })
      .catch(console.log)
  }

  getSecrets = () => {
    const token = localStorage.getItem("token")
    fetch("http://localhost:3001/secrets", {
      headers: {
        "Authorization": token
      }
    })
      .then(r => r.json())
      .then(secrets => {
        if (secrets.error) {
          alert("Not authized for these secrets")
        } else {
          //success
          this.setState({
            //replace the existing array of secrets with this response
            //.. which is also called secrets
            secrets
          })
        }
      }) // I want to grab that response from my secrets controller. An array of 2 objects
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
        <button onClick={this.getSecrets}>Show User's Secrets</button>
        <Secrets secrets={this.state.secrets}/>
      </div>
    );
  }
}

export default App;

// Auth Lecture June 03 2019 ^^^ will come out as a string thanks to jsx
// Q on Find:
//.. what will happen with Find if nothing is found?
//.. crashes
