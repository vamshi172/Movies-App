import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Header from '../Header'

import Footer from '../Footer'
import './index.css'

const apiStatusIdConst = {
  initilize: 'INITILIZE',
  success: 'SUCCESS',
  failure: 'FAILURE',
  isloading: 'ISLOADING',
}

const GenTten = props => {
  const {gens} = props

  return (
    <li className="gen">
      <p>{gens.name}</p>
    </li>
  )
}

const SpokenEn = props => {
  const {english} = props
  const {englishName} = english

  return (
    <li className="gen">
      <p>{englishName}</p>
    </li>
  )
}

class MovieDetails extends Component {
  state = {
    movieDetailsList: {},
    apiStatus: apiStatusIdConst.initilize,
    genres: {},
    simularMovies: {},
    spokenLanguage: {},
  }

  componentDidMount() {
    this.getMovieIdData()
  }

  getMovieIdData = async () => {
    this.setState({apiStatus: apiStatusIdConst.isloading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const movieidUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const moptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(movieidUrl, moptions)
    if (response.ok) {
      const data = await response.json()
      const tempmovieDe = data.movie_details
      console.log(tempmovieDe)
      const updatemovieData = {
        adult: tempmovieDe.adult,
        backDropPath: tempmovieDe.backdrop_path,
        budget: tempmovieDe.budget,
        id: tempmovieDe.id,
        overview: tempmovieDe.overview,
        posterPath: tempmovieDe.poster_path,
        releaseDate: tempmovieDe.release_date,
        runtime: tempmovieDe.runtime,
        title: tempmovieDe.title,
        voteAvarage: tempmovieDe.vote_average,
        voteCount: tempmovieDe.vote_count,
      }
      const tempGern = data.movie_details.genres
      const tempSimular = data.movie_details.similar_movies
      const updateSimular = tempSimular.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      const tempSpoken = data.movie_details.spoken_languages
      const updateSpoken = tempSpoken.map(eachItem => ({
        id: eachItem.id,
        englishName: eachItem.english_name,
      }))
      this.setState({
        apiStatus: apiStatusIdConst.success,
        movieDetailsList: updatemovieData,
        genres: tempGern,
        simularMovies: updateSimular,
        spokenLanguage: updateSpoken,
      })
      console.log(tempSpoken)
    } else {
      this.setState({apiStatus: apiStatusIdConst.failure})
    }
  }

  renderSuucessView = () => {
    const {movieDetailsList, genres, spokenLanguage, simularMovies} = this.state
    const {
      backDropPath,
      posterPath,
      title,
      runtime,
      releaseDate,
      adult,
      overview,
      voteCount,
      voteAvarage,
      budget,
    } = movieDetailsList

    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    const certification = adult ? 'A' : 'U/A'
    const releaseDateFormat = format(new Date(releaseDate), 'do MMMM yyyy')
    return (
      <>
        <div
          style={{
            backgroundImage: `url(${posterPath})`,
          }}
          className="small-device"
        >
          <Header />
          <div className="movieid-card">
            <h1 className="title-id">{title}</h1>
            <div className="row-time-etc">
              <p className="runtime">{`${hours}h ${minutes}m `}</p>
              <p className="certificate">{certification}</p>
              <p className="year">{year}</p>
            </div>
            <p className="overview">{overview}</p>
            <button className="play-btn" type="button">
              Play
            </button>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${backDropPath})`,
          }}
          className="large-device"
        >
          <Header />
          <div className="movieid-card">
            <h1 className="title-id">{title}</h1>
            <div className="row-time-etc">
              <p className="runtime">{`${hours}h ${minutes}m `}</p>
              <p className="certificate">{certification}</p>
              <p className="year">{year}</p>
            </div>
            <p className="overview">{overview}</p>
            <button className="play-btn" type="button">
              Play
            </button>
          </div>
        </div>
        <div className="sub-parts">
          <ul className="gerne-section">
            <h1 className="gen-name">Gernes</h1>
            {genres.map(each => (
              <GenTten key={each.id} gens={each} />
            ))}
          </ul>
          <ul className="gerne-section">
            <h1 className="gen-name">Audio Available</h1>
            {spokenLanguage.map(each => (
              <SpokenEn key={each.id} english={each} />
            ))}
          </ul>
          <div className="secon-con1">
            <ul className="gerne-section">
              <h1 className="gen-name">Rating Count</h1>
              <li className="gen">
                <p>{voteCount}</p>
              </li>
            </ul>
            <ul className="gerne-section1">
              <h1 className="gen-name">Rating Avarage</h1>
              <li className="gen">
                <p>{voteAvarage}</p>
              </li>
            </ul>
          </div>
          <div className="secon-con1">
            <ul className="gerne-section">
              <h1 className="gen-name">Budget</h1>
              <li className="gen">
                <p>{budget}</p>
              </li>
            </ul>
            <ul className="gerne-section1">
              <h1 className="gen-name">Release Date</h1>
              <li className="gen">
                <p>{releaseDateFormat}</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="similar-con">
          <h1 className="more-like">More like this</h1>
          <ul className="more-ul-con">
            {simularMovies.map(eachItem => (
              <li key={eachItem.id} className="li-name">
                <Link to={`/movies/${eachItem.id}`}>
                  <img
                    className="movie-item"
                    src={eachItem.backdropPath}
                    alt={title}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  ontryAgain = () => {
    this.getMovieIdData()
  }

  renderFailureView = () => (
    <div className="is-load">
      <img
        src="https://res.cloudinary.com/dqkmordkl/image/upload/v1678815381/Background-Completeaa_gwjqsp.png"
        className="error-img"
        alt="failure view"
      />
      <p className="error-name">Something went wrong, Please try again.</p>
      <button onClick={this.ontryAgain} className="error-btn" type="button">
        Try Again
      </button>
    </div>
  )

  renderIsloadin = () => (
    <>
      <Header />
      <div className="load-containeraa">
        <div className="card-loadaa">
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

  renderSwitchMovieID = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusIdConst.success:
        return this.renderSuucessView()
      case apiStatusIdConst.failure:
        return this.renderFailureView()
      case apiStatusIdConst.isloading:
        return this.renderIsloadin()
      default:
        return null
    }
  }

  render() {
    return <div className="movie-id">{this.renderSwitchMovieID()}</div>
  }
}

export default MovieDetails
