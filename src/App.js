import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import SearchResult from './components/SearchResult'
import PageNotFound from './components/PageNotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/searchpage" component={SearchResult} />
    <Route path="/page-not-found" component={PageNotFound} />
    <Redirect to="/page-not-found" />
  </Switch>
)

export default App
