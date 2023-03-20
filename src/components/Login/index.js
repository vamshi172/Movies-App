import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  onUserName = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitBtn = async event => {
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

  renderFormPage = () => {
    const {username, password, errorMsg, showError} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitBtn}>
        <h1 className="login-name">Login</h1>
        <div className="username-container">
          <label className="user-label" htmlFor="username">
            USERNAME
          </label>
          <input
            className="input-name"
            type="text"
            id="username"
            placeholder="rahul"
            onChange={this.onUserName}
            value={username}
          />
        </div>
        <div className="username-container">
          <label className="user-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            className="input-name"
            type="password"
            id="password"
            placeholder="**********"
            onChange={this.onPassword}
            value={password}
          />
        </div>
        {showError && <p className="error-msg">{errorMsg}</p>}
        <button className="sign-in-btn" type="submit">
          Sign in
        </button>
        <button className="login-in-btn" type="submit">
          Login
        </button>
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-heading">
        <img
          src="https://res.cloudinary.com/dqkmordkl/image/upload/v1678364630/Group_7399bb_uc0rco.png"
          className="main-name"
          alt="login website logo"
        />

        <div className="login-container">{this.renderFormPage()}</div>
      </div>
    )
  }
}

export default Login
