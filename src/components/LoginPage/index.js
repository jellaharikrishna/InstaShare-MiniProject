import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsgText: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsgText => {
    this.setState({showErrorMsg: true, errorMsgText})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  render() {
    const {errorMsgText, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginpage-bgcontainer">
        <img
          className="website-login"
          src="https://res.cloudinary.com/dmogabwqz/image/upload/v1726919576/Illustration_w8htot.jpg"
          alt="website login"
        />
        <form className="loginform" onSubmit={this.onSubmitLoginForm}>
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dmogabwqz/image/upload/v1726920837/logo_ynun8y.png"
            alt="website logo"
          />
          <h1 className="instashare-heading">Insta Share</h1>
          <div className="userinput-card">
            <label className="label-text" htmlFor="USERNAME">
              USERNAME
            </label>
            <input
              className="input-text"
              id="USERNAME"
              type="text"
              onChange={this.onChangeUsername}
              placeholder="Enter Your Username"
            />
          </div>
          <div className="userinput-card">
            <label className="label-text" htmlFor="PASSWORD">
              PASSWORD
            </label>
            <input
              className="input-text"
              id="PASSWORD"
              type="password"
              onChange={this.onChangePassword}
              placeholder="Enter Your Password"
            />
            {showErrorMsg && <p className="error-msg">{errorMsgText}</p>}
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginPage
