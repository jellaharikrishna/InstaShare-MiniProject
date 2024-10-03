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
        <div className="myprofile-details-card">
          <h1 className="myprofile-username">{userName}</h1>
          <div className="myprofile-pic-followers-card">
            <img
              className="myprofile-profilepic"
              src={profilePic}
              alt="my profile"
            />
            <p className="myprofile-count">
              {postsCount} <br />
              <span className="myprofile-count-text">posts</span>
            </p>

            <p className="myprofile-count">
              {followersCount} <br />
              <span className="myprofile-count-text">followers</span>
            </p>

            <p className="myprofile-count">
              {followingCount} <br />
              <span className="myprofile-count-text">following</span>
            </p>
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
        onClick={() => this.getMyProfile()}
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
      <>
        <Header />
        {this.renderMyProfileApiStatus()}
      </>
    )
  }
}

export default MyProfile
