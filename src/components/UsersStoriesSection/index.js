import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const usersStoriesSectionApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UsersStoriesSection extends Component {
  state = {
    usersStoriesSectionApiStatus: usersStoriesSectionApiStatusConstants.initial,
    usersStoriesList: [],
  }

  componentDidMount() {
    this.getUsersStories()
  }

  getUsersStories = async () => {
    this.setState({
      usersStoriesSectionApiStatus:
        usersStoriesSectionApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        usersStoriesList: updatedData,
        usersStoriesSectionApiStatus:
          usersStoriesSectionApiStatusConstants.success,
      })
    } else {
      this.setState({
        usersStoriesSectionApiStatus:
          usersStoriesSectionApiStatusConstants.failure,
      })
    }
  }

  usersStoriesLoadingView = () => (
    <div className="usersstories-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  usersStoriesSuccessView = () => {
    const {usersStoriesList} = this.state
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
          },
        },
      ],
    }

    return (
      <div className="slider-container">
        <Slider className="slider" {...settings}>
          {usersStoriesList.map(eachStoryList => {
            const {userId, userName, storyUrl} = eachStoryList

            return (
              <ul className="usersstories-section-container" key={userId}>
                <Link
                  className="userstory-classname-link"
                  to={`/users/${userId}`}
                >
                  <li className="userstory-li">
                    <img
                      className="userstory-image"
                      src={storyUrl}
                      alt="user story"
                    />
                    <p className="userstory-username">{userName}</p>
                  </li>
                </Link>
              </ul>
            )
          })}
        </Slider>
      </div>
    )
  }

  onClickTryAgainBtn = () => {
    this.getUsersStories()
  }

  usersStoriesFailureView = () => (
    <div className="usersstories-failure-container">
      <img
        className="usersstories-failure-image"
        src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727156189/Icon_xj1k3d.png"
        alt="failure view"
      />
      <h1 className="usersstories-failure-heading">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={this.onClickTryAgainBtn}
        className="usersstories-failure-btn"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderUsersStoriesSectionApiStatus = () => {
    const {usersStoriesSectionApiStatus} = this.state

    switch (usersStoriesSectionApiStatus) {
      case usersStoriesSectionApiStatusConstants.inProgress:
        return this.usersStoriesLoadingView()
      case usersStoriesSectionApiStatusConstants.success:
        return this.usersStoriesSuccessView()
      case usersStoriesSectionApiStatusConstants.failure:
        return this.usersStoriesFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderUsersStoriesSectionApiStatus()}</>
  }
}

export default UsersStoriesSection
