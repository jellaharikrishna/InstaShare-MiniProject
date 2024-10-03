import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import LoginPage from './components/LoginPage'
import SearchContext from './context/SearchContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import PageNotFound from './components/PageNotFound'
import './App.css'

class App extends Component {
  state = {
    searchInput: '',
    showMobileSearchBar: false,
    showMobileSearchPage: false,
    showSearchResult: false,
    userSearchList: [],
    isLoading: false,
    isSuccess: false,
    isFailure: false,
  }

  updatedSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updatedShowMobileSearchBar = () => {
    this.setState({
      showMobileSearchBar: true,
      showSearchResult: true,
      searchInput: '',
    })
  }

  updatedNotShowingBarPageResult = () => {
    this.setState({
      showMobileSearchBar: false,
      showMobileSearchPage: false,
      showSearchResult: false,
      searchInput: '',
    })
  }

  onUserSearchToggleLikeIcon = async (postId, likeStatusValue) => {
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

  getUserSearchResult = async () => {
    const {searchInput} = this.state
    this.setState({
      showMobileSearchPage: true,
      showSearchResult: true,
      isLoading: true,
      isSuccess: false,
      isFailure: false,
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
        isSuccess: true,
        isLoading: false,
        isFailure: false,
      })
    } else {
      this.setState({
        showMobileSearchBar: false,
        isFailure: true,
        isLoading: false,
        isSuccess: false,
      })
    }
  }

  render() {
    const {
      searchInput,
      showMobileSearchBar,
      showMobileSearchPage,
      showSearchResult,
      userSearchList,
      isLoading,
      isSuccess,
      isFailure,
    } = this.state

    return (
      <SearchContext.Provider
        value={{
          searchInput,
          updatedSearchInput: this.updatedSearchInput,
          showMobileSearchBar,
          showMobileSearchPage,
          showSearchResult,
          updatedShowMobileSearchBar: this.updatedShowMobileSearchBar,
          updatedNotShowingBarPageResult: this.updatedNotShowingBarPageResult,
          getUserSearchResult: this.getUserSearchResult,
          userSearchList,
          isLoading,
          isSuccess,
          isFailure,
          renderLoading: this.renderLoading,
          renderSuccess: this.renderSuccess,
          renderFailure: this.renderFailure,
          onUserSearchToggleLikeIcon: this.onUserSearchToggleLikeIcon,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute exact path="/my-profile" component={MyProfile} />
          <Route path="/page-not-found" component={PageNotFound} />
          <Redirect to="/page-not-found" />
        </Switch>
      </SearchContext.Provider>
    )
  }
}

export default App
