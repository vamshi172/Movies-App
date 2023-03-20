import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import SliceItem from '../SliceItem'

import './index.css'

const apiTrendingConst = {
  initilize: 'INITILIZE',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isprogress: 'ISPROGRESS',
}

class Trending extends Component {
  state = {apiTrending: apiTrendingConst.initilize, trendDataList: {}}

  componentDidMount() {
    this.getTrendingData()
  }

  getTrendingData = async () => {
    this.setState({apiTrending: apiTrendingConst.isprogress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const trendData = data.results

      const updateData = trendData.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        title: eachItem.title,
      }))
      this.setState({
        trendDataList: updateData,
        apiTrending: apiTrendingConst.success,
      })
    } else {
      this.setState({apiTrending: apiTrendingConst.failure})
    }
  }

  renderTreSuccess = () => {
    const {trendDataList} = this.state
    return (
      <>
        <SliceItem movies={trendDataList} />
      </>
    )
  }

  tryAgainDataTrebd = () => {
    this.getTrendingData()
  }

  renderTreFail = () => (
    <div className="load-container1">
      <div className="card-load1">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426934/homepage-failure_egb8fl.png"
          className="failure-view"
          alt="failure view"
        />
        <p className="isprosee">Something went wrong. Please try again</p>
        <button
          onClick={this.tryAgainDataTrebd}
          className="try-again"
          type="button"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  renderTreIsloa = () => (
    <div className="load-container1">
      <div className="card-load1">
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

  renderTrendSwitch = () => {
    const {apiTrending} = this.state

    switch (apiTrending) {
      case apiTrendingConst.success:
        return this.renderTreSuccess()
      case apiTrendingConst.failure:
        return this.renderTreFail()
      case apiTrendingConst.isprogress:
        return this.renderTreIsloa()
      default:
        return null
    }
  }

  render() {
    return <div className="trending-con">{this.renderTrendSwitch()}</div>
  }
}

export default Trending
