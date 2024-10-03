import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import InstaPostView from '../InstaPostView'

import './index.css'

const usersPostsSectionApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UsersPostsSection extends Component {
  state = {
    usersPostsSectionApiStatus: usersPostsSectionApiStatusConstants.initial,
    usersPostsList: [],
  }

  componentDidMount() {
    this.getUsersPosts()
  }

  getUsersPosts = async () => {
    this.setState({
      usersPostsSectionApiStatus:
        usersPostsSectionApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/posts'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.posts.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        postId: each.post_id,
        profilePic: each.profile_pic,
        caption: each.post_details.caption,
        imageUrl: each.post_details.image_url,
        likesCount: each.likes_count,
        createdAt: each.created_at,
        commentsList: each.comments.map(item => ({
          comment: item.comment,
          userId: item.user_id,
          username: item.user_name,
        })),
      }))
      this.setState({
        usersPostsList: updatedData,
        usersPostsSectionApiStatus: usersPostsSectionApiStatusConstants.success,
      })
    } else {
      this.setState({
        usersPostsSectionApiStatus: usersPostsSectionApiStatusConstants.failure,
      })
    }
  }

  usersPostsLoadingView = () => (
    <div className="usersposts-loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onToggleLikeIcon = async (postId, likeStatusValue) => {
    const jwtToken = Cookies.get('jwt_token')
    const postLikeAPiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const likeStatusDetails = {like_status: likeStatusValue}

    const options = {
      method: 'POST',
      body: JSON.stringify(likeStatusDetails),
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(postLikeAPiUrl, options)
    const data = await response.json()

    const {usersPostsList} = this.state
    let updatedPostList = usersPostsList

    updatedPostList = usersPostsList.map(eachPost => {
      if (eachPost.postId === postId && likeStatusValue) {
        return {
          ...eachPost,
          message: data.message,
          likesCount: eachPost.likesCount + 1,
        }
      }
      if (eachPost.postId === postId && !likeStatusValue) {
        return {
          ...eachPost,
          message: data.message,
          likesCount: eachPost.likesCount - 1,
        }
      }
      return eachPost
    })
    this.setState({usersPostsList: updatedPostList})
  }

  usersPostsSuccessView = () => {
    const {usersPostsList} = this.state
    return (
      <ul className="usersposts-instapostview-container">
        {usersPostsList.map(eachList => (
          <InstaPostView
            key={eachList.postId}
            eachList={eachList}
            onToggleLikeIcon={this.onToggleLikeIcon}
          />
        ))}
      </ul>
    )
  }

  usersPostsFailureView = () => (
    <div className="usersposts-failure-container">
      <img
        className="usersposts-failure-image"
        src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727156189/Icon_xj1k3d.png"
        alt="failure view"
      />
      <h1 className="usersposts-failure-heading">
        Something went wrong. Please try again
      </h1>
      <button
        onClick={() => this.getUsersPosts()}
        className="usersposts-failure-btn"
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderUsersPostsSectionApiStatus = () => {
    const {usersPostsSectionApiStatus} = this.state

    switch (usersPostsSectionApiStatus) {
      case usersPostsSectionApiStatusConstants.inProgress:
        return this.usersPostsLoadingView()
      case usersPostsSectionApiStatusConstants.success:
        return this.usersPostsSuccessView()
      case usersPostsSectionApiStatusConstants.failure:
        return this.usersPostsFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderUsersPostsSectionApiStatus()}</>
  }
}

export default UsersPostsSection
