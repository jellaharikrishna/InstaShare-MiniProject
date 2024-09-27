import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import Header from '../Header'

import './index.css'

const myProfileApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {
    myProfileApiStatus: myProfileApiStatusConstants.initial,
    myProfileData: {},
  }

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({
      myProfileApiStatus: myProfileApiStatusConstants.inProgress,
    })

    const myProfileApiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(myProfileApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        id: data.profile.id,
        userId: data.profile.user_id,
        userName: data.profile.user_name,
        userBio: data.profile.user_bio,
        profilePic: data.profile.profile_pic,
        postsCount: data.profile.posts_count,
        followersCount: data.profile.followers_count,
        followingCount: data.profile.following_count,
        postsList: data.profile.posts,
        storiesList: data.profile.stories,
      }
      this.setState({
        myProfileData: updatedData,
        myProfileApiStatus: myProfileApiStatusConstants.success,
      })
    } else {
      this.setState({
        myProfileApiStatus: myProfileApiStatusConstants.failure,
      })
    }
  }

  myProfileLoadingView = () => (
    <div className="myprofile-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  myProfileSuccessView = () => {
    const {myProfileData} = this.state
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
    } = myProfileData
    return (
      <>
        <div className="myprofile-mobile-details-card">
          <h1 className="myprofile-username">{userName}</h1>
          <div className="myprofile-pic-followers-card">
            <img
              className="myprofile-profilepic"
              src={profilePic}
              alt="my profile"
            />
            <ul className="myprofile-count-card">
              <li className="myprofile-count">{postsCount}</li>
              <li className="myprofile-count-text">posts</li>
            </ul>
            <ul className="myprofile-count-card">
              <li className="myprofile-count">{followersCount}</li>
              <li className="myprofile-count-text">followers</li>
            </ul>
            <ul className="myprofile-count-card">
              <li className="myprofile-count">{followingCount}</li>
              <li className="myprofile-count-text">following</li>
            </ul>
          </div>
          <p className="myprofile-userid">{userId}</p>
          <p className="myprofile-userbio">{userBio}</p>
          <ul className="myprofile-storieslist-card">
            {storiesList.map(each => (
              <li className="myprofile-storieslist-li" key={each.id}>
                <img
                  className="myprofile-storieslist-image"
                  src={each.image}
                  alt="my story"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="myprofile-desktop-details-card">
          <div className="myprofile-desktop-userbio-card">
            <img
              className="myprofile-desktop-profilepic"
              src={profilePic}
              alt="my profile"
            />

            <div className="myprofile-desktop-username-followers-card">
              <h1 className="myprofile-desktop-username">{userName}</h1>
              <ul className="myprofile-desktop-count-followers-card">
                <li className="myprofile-desktop-count">
                  {postsCount}
                  <span className="myprofile-desktop-count-text">posts</span>
                </li>

                <li className="myprofile-desktop-count">
                  {followersCount}
                  <span className="myprofile-desktop-count-text">
                    followers
                  </span>
                </li>

                <li className="myprofile-desktop-count">
                  {followingCount}
                  <span className="myprofile-desktop-count-text">
                    following
                  </span>
                </li>
              </ul>
              <h1 className="myprofile-desktop-userid">{userId}</h1>
              <p className="myprofile-desktop-userbio">{userBio}</p>
            </div>
          </div>
          <ul className="myprofile-desktop-storieslist-card">
            {storiesList.map(each => (
              <li className="myprofile-desktop-storieslist-li" key={each.id}>
                <img
                  className="myprofile-desktop-storieslist-image"
                  src={each.image}
                  alt="my story"
                />
              </li>
            ))}
          </ul>
        </div>
        <hr className="myprofile-hrline" />
        <div className="myprofile-postslist-container">
          <div className="myprofile-postslist-title-card">
            <BsGrid3X3 className="myprofile-postslist-icon" />
            <h1 className="myprofile-postslist-heading">Posts</h1>
          </div>
          {postsList.length === 0 ? (
            <div className="myprofile-postlist-emptyview-container">
              <div className="myprofile-postlist-emptyview-card">
                <div className="myprofile-postlist-emptyview-icon-card">
                  <BiCamera className="myprofile-postlist-emptyview-icon" />
                </div>
                <h1 className="myprofile-postlist-emptyview-heading">
                  No Posts Yet
                </h1>
              </div>
            </div>
          ) : (
            <ul className="myprofile-postslist-ul-card">
              {postsList.map(each => (
                <li className="myprofile-postslist-li" key={each.id}>
                  <img
                    className="myprofile-postslist-image"
                    src={each.image}
                    alt="my post"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  onClickMyProfileTryAgain = () => {
    this.getMyProfile()
  }

  myProfileFailureView = () => (
    <div className="myprofile-failure-container">
      <img
        className="myprofile-wentwrong-image"
        src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727156189/Icon_xj1k3d.png"
        alt="failure view"
      />
      <p className="myprofile-wentwrong-heading">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.onClickMyProfileTryAgain}
        className="myprofile-tryagain-btn"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderMyProfileApiStatus = () => {
    const {myProfileApiStatus} = this.state

    switch (myProfileApiStatus) {
      case myProfileApiStatusConstants.inProgress:
        return this.myProfileLoadingView()
      case myProfileApiStatusConstants.success:
        return this.myProfileSuccessView()
      case myProfileApiStatusConstants.failure:
        return this.myProfileFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="myprofile-bgcontainer">
        <Header />
        {this.renderMyProfileApiStatus()}
      </div>
    )
  }
}

export default MyProfile
