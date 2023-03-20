import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SliceItem from '../SliceItem'

import './index.css'

const apiOriginalConst = {
  initilize: 'INITILIZE',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isprogress: 'ISPROGRESS',
}

class Original extends Component {
  state = {apiOriginal: apiOriginalConst.initilize, originalList: {}}

  componentDidMount() {
    this.getOriginalData()
  }

  getOriginalData = async () => {
    this.setState({apiOriginal: apiOriginalConst.isprogress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const OriginalData = data.results
      console.log(OriginalData)
      const updateData = OriginalData.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        backdropPath: eachItem.backdrop_path,
      }))
      this.setState({
        originalList: updateData,
        apiOriginal: apiOriginalConst.success,
      })
    } else {
      this.setState({apiOriginal: apiOriginalConst.failure})
    }
  }

  renderOriSucc = () => {
    const {originalList} = this.state

    return <SliceItem movies={originalList} />
  }

  tryAgainDataOri = () => {
    this.getOriginalData()
  }

  renderOriFail = () => (
    <div className="original-list">
      <div className="card-original">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426934/homepage-failure_egb8fl.png"
          className="failure-view"
          alt="failure view"
        />
        <p className="isprosee">Something went wrong. Please try again</p>
        <button
          onClick={this.tryAgainDataOri}
          className="try-again"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderIsLoad = () => (
    <div className="original-list">
      <div className="card-original">
        <div className="loader-container" testid="loader">
          <Loader
            testid="loader"
            type="TailSpin"
            color="#D81F26"
            height={50}
            width={50}
          />
        </div>
      </div>
    </div>
  )

  renderOriginalSwitch = () => {
    const {apiOriginal} = this.state

    switch (apiOriginal) {
      case apiOriginalConst.success:
        return this.renderOriSucc()
      case apiOriginalConst.failure:
        return this.renderOriFail()
      case apiOriginalConst.isprogress:
        return this.renderIsLoad()
      default:
        return null
    }
  }

  render() {
    return <div className="trending-con1">{this.renderOriginalSwitch()}</div>
  }
}

export default Original
