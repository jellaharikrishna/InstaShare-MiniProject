import {Component} from 'react'

import Header from '../Header'
import UsersStoriesSection from '../UsersStoriesSection'
import UsersPostsSection from '../UsersPostsSection'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-bgcontainer">
        <Header />
        <UsersStoriesSection />
        <hr className="home-hrline" />
        <UsersPostsSection />
      </div>
    )
  }
}

export default Home
