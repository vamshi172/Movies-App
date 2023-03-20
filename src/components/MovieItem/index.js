import {Link, withRouter} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {eachMovie} = props
  const {title, id, backdropPath} = eachMovie
  return (
    <Link to={`/movies/${id}`}>
      <li className="li-name">
        <img className="movie-item" src={backdropPath} alt={title} />
      </li>
    </Link>
  )
}

export default withRouter(MovieItem)
