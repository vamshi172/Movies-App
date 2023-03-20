import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Trending from '../Trending'
import Original from '../Original'
import Footer from '../Footer'
import TopRated from '../TopRated'

import './index.css'

const apiHomeRouteConst = {
  initilize: 'INITILIZE',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isprogress: 'ISPROGRESS',
}

class Home extends Component {
  state = {
    initialPoster: {},
    apiStatus: apiHomeRouteConst.initilize,
  }

  componentDidMount() {
    this.getPosterData()
  }

  getPosterData = async () => {
    this.setState({apiStatus: apiHomeRouteConst.isprogress})
    const jwtToken = Cookies.get('jwt_token')
    const randomUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(randomUrl, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      this.setState({
        apiStatus: apiHomeRouteConst.success,
        initialPoster: updatedData,
      })
    } else {
      this.setState({apiStatus: apiHomeRouteConst.failure})
    }
  }

  renderPosterLoad = () => (
    <>
      <Header />
      <div className="load-container">
        <div className="card-load">
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
    </>
  )

  tryAgainData = () => {
    this.getPosterData()
  }

  renderPoserFail = () => (
    <>
      <Header />
      <div className="load-container">
        <div className="card-load">
          <img
            src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426934/homepage-failure_egb8fl.png"
            className="failure-view"
            alt="failure view"
          />
          <p className="isprosee">Something went wrong. Please try again</p>
          <button
            onClick={this.tryAgainData}
            className="try-again"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    </>
  )

  renderPosterSuccess = () => {
    const {initialPoster} = this.state
    const {backdropPath, title, overview} = initialPoster
    return (
      <div
        alt={title}
        style={{backgroundImage: `url(${backdropPath})`}}
        className="posterContainer"
      >
        <Header />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <p className="overview">{overview}</p>
          <button className="play-btn" type="button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderPosterSwitch = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiHomeRouteConst.success:
        return this.renderPosterSuccess()
      case apiHomeRouteConst.failure:
        return this.renderPoserFail()
      case apiHomeRouteConst.isprogress:
        return this.renderPosterLoad()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        {this.renderPosterSwitch()}
        <div className="bottom-section">
          <h1 className="trending-name">Trending Now</h1>
          <Trending />
          <h1 className="trending-name">Top Rated</h1>
          <TopRated />
          <h1 className="trending-name">Originals</h1>
          <Original />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
