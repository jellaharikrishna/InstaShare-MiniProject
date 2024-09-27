import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaSearch} from 'react-icons/fa'

import Header from '../Header'
import InstaPostView from '../InstaPostView'

import './index.css'

const userSearchApiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchResult extends Component {
  state = {
    userSearchApiStatus: userSearchApiStatusConstants.initial,
    userSearchList: [],
    searchInput: '',
    showResult: false,
  }

  getSearchResult = async () => {
    const {searchInput} = this.state
    this.setState({
      userSearchApiStatus: userSearchApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const searchResultApiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(searchResultApiUrl, options)
    const data = await response.json()
    console.log(data)

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
        userSearchList: updatedData,
        userSearchApiStatus: userSearchApiStatusConstants.success,
      })
    } else {
      this.setState({
        userSearchApiStatus: userSearchApiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onClickSearchBtn = () => {
    this.setState({showResult: true}, this.getSearchResult)
  }

  userSearchLoadingView = () => (
    <div className="searchresult-loader-container" testid="loader">
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

    const {userSearchList} = this.state
    let updatedSearchList = userSearchList

    updatedSearchList = userSearchList.map(eachPost => {
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
    this.setState({userSearchList: updatedSearchList})
  }

  userSearchSuccessView = () => {
    const {userSearchList} = this.state
    return (
      <>
        {userSearchList.length === 0 ? (
          <div className="searchresult-searchnotfound-container">
            <img
              className="searchresult-searchnotfound-image"
              src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727335607/Group_are0je.png"
              alt="search not found"
            />
            <h1 className="searchresult-searchnotfound-heading">
              Search Not Found
            </h1>
            <p className="searchresult-searchnotfound-para">
              Try different keyword or search again
            </p>
          </div>
        ) : (
          <ul className="searchresult-instapostview-container">
            {userSearchList.map(eachList => (
              <InstaPostView
                key={eachList.postId}
                eachList={eachList}
                onToggleLikeIcon={this.onToggleLikeIcon}
              />
            ))}
          </ul>
        )}
      </>
    )
  }

  onClickTryagainBtn = () => this.getSearchResult()

  userSearchFailureView = () => (
    <div className="searchresult-failure-container">
      <img
        className="searchresult-failure-image"
        src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727345155/Group_7737_ija7dw.png"
        alt="failure view"
      />
      <h1 className="searchresult-failure-heading">
        Something went wrong. Please try again
      </h1>
      <button
        className="searchresult-failure-btn"
        type="button"
        onClick={this.onClickTryagainBtn}
      >
        Try again
      </button>
    </div>
  )

  renderUserSearchApiStatus = () => {
    const {userSearchApiStatus} = this.state

    switch (userSearchApiStatus) {
      case userSearchApiStatusConstants.inProgress:
        return this.userSearchLoadingView()
      case userSearchApiStatusConstants.success:
        return this.userSearchSuccessView()
      case userSearchApiStatusConstants.failure:
        return this.userSearchFailureView()
      default:
        return null
    }
  }

  render() {
    const {showResult} = this.state
    return (
      <div className="searchresult-bgcontainer">
        <Header />
        <div className="searchresult-search-card">
          <input
            className="searchresult-search-input"
            type="search"
            placeholder="Search Caption"
            onChange={this.onChangeSearchInput}
          />
          <button
            className="searchresult-search-icon-btn"
            type="button"
            onClick={this.onClickSearchBtn}
          >
            <FaSearch
              className="searchresult-search-icon"
              testid="searchIcon"
            />
          </button>
        </div>
        {showResult ? (
          this.renderUserSearchApiStatus()
        ) : (
          <div className="searchresult-showresult-container">
            <FaSearch className="searchresult-showresult-search-icon" />
            <h1 className="searchresult-showresult-para">
              Search Results will be appear here
            </h1>
          </div>
        )}
      </div>
    )
  }
}

export default SearchResult

/*
<ul className="searchresult-section-container">
            {userSearchList.map(eachSearchList => {
              const {
                userId,
                userName,
                postId,
                profilePic,
                caption,
                imageUrl,
                likesCount,
                createdAt,
                commentsList,
              } = eachSearchList

              return (
                <li className="searchresult-li-container" key={postId}>
                  <div className="searchresult-header-card">
                    <div className="searchresult-profile-icon-border">
                      <img
                        className="searchresult-profile-icon"
                        src={profilePic}
                        alt="post author profile"
                      />
                    </div>
                    <Link
                      className="searchresult-classname-link"
                      to={`/users/${userId}`}
                    >
                      <h1 className="searchresult-userame">{userName}</h1>
                    </Link>
                  </div>
                  <img
                    className="searchresult-image"
                    src={imageUrl}
                    alt="post"
                  />
                  <div className="searchresult-footer-card">
                    <div className="searchresult-btn-card">
                      <button
                        onClick={this.onClickDislikeBtn}
                        className="searchresult-icon-btn"
                        type="button"
                        testid="unLikeIcon"
                      >
                        <FcLike className="searchresult-icon" />
                      </button>
                      <button
                        onClick={this.onClickLikeBtn}
                        className="searchresult-icon-btn"
                        type="button"
                        testid="likeIcon"
                      >
                        <BsHeart className="searchresult-icon" />
                      </button>
                      <button className="searchresult-icon-btn" type="button">
                        <FaRegComment className="searchresult-icon" />
                      </button>
                      <button className="searchresult-icon-btn" type="button">
                        <BiShareAlt className="searchresult-icon" />
                      </button>
                    </div>
                    <p className="searchresult-likes">{likesCount} likes</p>
                    <p className="searchresult-caption">{caption}</p>
                    {commentsList.map(each => (
                      <p className="searchresult-comment" key={each.userId}>
                        <span className="searchresult-spancomment">
                          {each.username}
                        </span>
                        {each.comment}
                      </p>
                    ))}
                    <p className="searchresult-createdat">{createdAt}</p>
                  </div>
                </li>
              )
            })}
          </ul>
 */
