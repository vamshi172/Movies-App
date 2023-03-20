import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Footer from '../Footer'
import './index.css'

const apiStatusPopularConst = {
  initilize: 'INITILIZE',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isloading: 'ISLOADING',
}

class Popular extends Component {
  state = {popularDataList: {}, apiPopular: apiStatusPopularConst.initilize}

  componentDidMount() {
    this.getPopularData()
  }

  getPopularData = async () => {
    this.setState({apiPopular: apiStatusPopularConst.isloading})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const popularData = data.results
      const updateData = popularData.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        title: eachItem.title,
      }))
      this.setState({
        popularDataList: updateData,
        apiPopular: apiStatusPopularConst.success,
      })
    } else {
      this.setState({apiPopular: apiStatusPopularConst.failure})
    }
  }

  renderPopSuccess = () => {
    const {popularDataList} = this.state
    return (
      <>
        <ul className="ul-list">
          {popularDataList.map(eachMovie => (
            <MovieItem eachMovie={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
      </>
    )
  }

  ontryAgain = () => {
    this.getPopularData()
  }

  renderPopFalure = () => (
    <div className="is-load">
      <img
        src="https://res.cloudinary.com/dqkmordkl/image/upload/v1678815381/Background-Completeaa_gwjqsp.png"
        className="error-img"
        alt="error img"
      />
      <p className="error-name">Something went wrong, Please try again.</p>
      <button onClick={this.ontryAgain} className="error-btn" type="button">
        Try Again
      </button>
    </div>
  )

  renderPopISlod = () => (
    <div className="is-load">
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
  )

  renderSwitchPopular = () => {
    const {apiPopular} = this.state

    switch (apiPopular) {
      case apiStatusPopularConst.success:
        return this.renderPopSuccess()
      case apiStatusPopularConst.failure:
        return this.renderPopFalure()
      case apiStatusPopularConst.isloading:
        return this.renderPopISlod()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        <div className="popular-card">{this.renderSwitchPopular()}</div>
        <Footer />
      </div>
    )
  }
}

export default Popular
