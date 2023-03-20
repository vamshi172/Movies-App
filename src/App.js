import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Account from './components/Account'
import Popular from './components/Popular'
import MovieDetails from './components/MovieDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import SearchMovies from './components/SearchMovies'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
      <ProtectedRoute exact path="/search" component={SearchMovies} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
