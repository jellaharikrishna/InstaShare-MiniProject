import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'

import './index.css'

const userProfileApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userProfileApiStatus: userProfileApiStatusConstants.initial,
    userProfileData: {},
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({
      userProfileApiStatus: userProfileApiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const userProfileApiUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(userProfileApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.user_details.id,
        userId: data.user_details.user_id,
        userName: data.user_details.user_name,
        userBio: data.user_details.user_bio,
        profilePic: data.user_details.profile_pic,
        postsCount: data.user_details.posts_count,
        followersCount: data.user_details.followers_count,
        followingCount: data.user_details.following_count,
        postsList: data.user_details.posts,
        storiesList: data.user_details.stories,
      }
      this.setState({
        userProfileData: updatedData,
        userProfileApiStatus: userProfileApiStatusConstants.success,
      })
    } else {
      this.setState({
        userProfileApiStatus: userProfileApiStatusConstants.failure,
      })
    }
  }

  userProfileLoadingView = () => (
    <div className="userprofile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  userProfileSuccessView = () => {
    const {userProfileData} = this.state
    const {
      userId,
      userName,
      userBio,
      profilePic,
      postsCount,
      followersCount,
      followingCount,
      postsList,
      storiesList,
    } = userProfileData
    return (
      <>
        <div className="userprofile-mobile-details-card">
          <h1 className="userprofile-username">{userName}</h1>
          <div className="userprofile-pic-followers-card">
            <img
              className="userprofile-profilepic"
              src={profilePic}
              alt="user profile"
            />
            <div className="userprofile-count-card">
              <p className="userprofile-count">{postsCount}</p>
              <p className="userprofile-count-text">posts</p>
            </div>
            <div className="userprofile-count-card">
              <p className="userprofile-count">{followersCount}</p>
              <p className="userprofile-count-text">followers</p>
            </div>
            <div className="userprofile-count-card">
              <p className="userprofile-count">{followingCount}</p>
              <p className="userprofile-count-text">following</p>
            </div>
          </div>
          <h1 className="userprofile-userid">{userId}</h1>
          <p className="userprofile-userbio">{userBio}</p>
          <ul className="userprofile-storieslist-card">
            {storiesList.map(each => (
              <li className="userprofile-storieslist-li" key={each.id}>
                <img
                  className="userprofile-storieslist-image"
                  src={each.image}
                  alt="user story"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="userprofile-desktop-details-card">
          <div className="userprofile-desktop-userbio-card">
            <img
              className="userprofile-desktop-profilepic"
              src={profilePic}
              alt="user profile"
            />

            <div className="userprofile-desktop-username-followers-card">
              <h1 className="userprofile-desktop-username">{userName}</h1>
              <div className="userprofile-desktop-count-followers-card">
                <p className="userprofile-desktop-count">
                  {postsCount}
                  <span className="userprofile-desktop-count-text">posts</span>
                </p>

                <p className="userprofile-desktop-count">
                  {followersCount}
                  <span className="userprofile-desktop-count-text">
                    followers
                  </span>
                </p>

                <p className="userprofile-desktop-count">
                  {followingCount}
                  <span className="userprofile-desktop-count-text">
                    following
                  </span>
                </p>
              </div>
              <h1 className="userprofile-desktop-userid">{userId}</h1>
              <p className="userprofile-desktop-userbio">{userBio}</p>
            </div>
          </div>
          <ul className="userprofile-desktop-storieslist-card">
            {storiesList.map(each => (
              <li className="userprofile-desktop-storieslist-li" key={each.id}>
                <img
                  className="userprofile-desktop-storieslist-image"
                  src={each.image}
                  alt="user story"
                />
              </li>
            ))}
          </ul>
        </div>
        <hr className="userprofile-hrline" />
        <div className="userprofile-postslist-container">
          <div className="userprofile-postslist-title-card">
            <BsGrid3X3 className="userprofile-postslist-icon" />
            <h1 className="userprofile-postslist-heading">Posts</h1>
          </div>
          {postsList.length === 0 ? (
            <div className="userprofile-postlist-emptyview-container">
              <div className="userprofile-postlist-emptyview-card">
                <div className="userprofile-postlist-emptyview-icon-card">
                  <BiCamera className="userprofile-postlist-emptyview-icon" />
                </div>
                <h1 className="userprofile-postlist-emptyview-heading">
                  No Posts Yet
                </h1>
              </div>
            </div>
          ) : (
            <ul className="userprofile-postslist-ul-card">
              {postsList.map(each => (
                <li className="userprofile-postslist-li" key={each.id}>
                  <img
                    className="userprofile-postslist-image"
                    src={each.image}
                    alt="user post"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  onClickUserProfileTryAgain = () => {
    this.getUserProfile()
  }

  userProfileFailureView = () => (
    <div className="userprofile-failure-container">
      <img
        className="userprofile-wentwrong-image"
        src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727156189/Icon_xj1k3d.png"
        alt="failure view"
      />
      <h1 className="userprofile-wentwrong-heading">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={this.onClickUserProfileTryAgain}
        className="userprofile-tryagain-btn"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderUserProfileApiStatus = () => {
    const {userProfileApiStatus} = this.state

    switch (userProfileApiStatus) {
      case userProfileApiStatusConstants.inProgress:
        return this.userProfileLoadingView()
      case userProfileApiStatusConstants.success:
        return this.userProfileSuccessView()
      case userProfileApiStatusConstants.failure:
        return this.userProfileFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="userprofile-bgcontainer">
        <Header />
        {this.renderUserProfileApiStatus()}
      </div>
    )
  }
}

export default UserProfile
