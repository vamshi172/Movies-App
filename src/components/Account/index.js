import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const logoutfuction = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="account-container">
      <Header />
      <div className="card-con">
        <h1 className="account-name">Account</h1>
        <hr className="line" />
        <div className="membership-con">
          <p className="member-name">Member ship</p>
          <div className="pass-maail-con">
            <p className="gmail">rahul@gmail.com</p>
            <p className="pass">
              Password : <span classN>*********</span>
            </p>
          </div>
        </div>
        <hr className="line" />
        <div className="plan-section">
          <p className="plan-name">Plan Details</p>
          <p className="type">Premium</p>
          <p className="ultra">Ultra HD</p>
        </div>
        <hr className="line" />
        <div className="btn-midil">
          <button onClick={logoutfuction} className="logout" type="button">
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
