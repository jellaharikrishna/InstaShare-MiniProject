import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UsersStoriesSection from '../UsersStoriesSection'
import UsersPostsSection from '../UsersPostsSection'

import UserSearchInstaPostView from '../UserSearchInstaPostView'
import SearchContext from '../../context/SearchContext'

import './index.css'

class Home extends Component {
  render() {
    return (
      <SearchContext.Consumer>
        {value => {
          const {
            showSearchResult,
            showMobileSearchPage,
            isLoading,
            isSuccess,
            isFailure,
            userSearchList,
            onUserSearchToggleLikeIcon,
            getUserSearchResult,
          } = value

          const userSearchLoadingView = () => (
            <div className="searchresult-loader-container" testid="loader">
              <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
            </div>
          )

          const userSearchSuccessView = () => (
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
                <div className="searchresult-desktop-container">
                  <h1 className="searchresult-desktop-searchresult-heading">
                    Search Results
                  </h1>
                  <ul className="searchresult-usersearchinstapostview-container">
                    {userSearchList.map(eachList => (
                      <UserSearchInstaPostView
                        key={eachList.postId}
                        eachList={eachList}
                        onUserSearchToggleLikeIcon={onUserSearchToggleLikeIcon}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </>
          )

          const userSearchFailureView = () => (
            <div className="searchresult-failure-container">
              <img
                className="searchresult-failure-image"
                src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727345155/Group_7737_ija7dw.png"
                alt="failure view"
              />
              <p className="searchresult-failure-heading">
                Something went wrong. Please try again
              </p>
              <button
                className="searchresult-failure-btn"
                type="button"
                onClick={getUserSearchResult}
              >
                Try again
              </button>
            </div>
          )

          return (
            <>
              <Header />
              {showSearchResult ? (
                <>
                  {showMobileSearchPage ? (
                    <>
                      {isLoading && userSearchLoadingView()}
                      {isSuccess && userSearchSuccessView()}
                      {isFailure && userSearchFailureView()}
                    </>
                  ) : (
                    <div className="searchresult-showresult-container">
                      <img
                        className="searchresult-showresult-search-icon"
                        src="https://res.cloudinary.com/dmogabwqz/image/upload/v1727703726/Frame_1473_cb7d4u.png"
                        alt="searching"
                      />
                      <h1 className="searchresult-showresult-para">
                        Search Results will be appear here
                      </h1>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <UsersStoriesSection />
                  <UsersPostsSection />
                </>
              )}
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default Home
