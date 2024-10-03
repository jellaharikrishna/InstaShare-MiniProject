import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoIosMenu} from 'react-icons/io'
import {MdCancel} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'

import SearchContext from '../../context/SearchContext'

import './index.css'

class Header extends Component {
  state = {showHamburger: false}

  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHamburger = () => {
    const {showHamburger} = this.state
    this.setState({showHamburger: !showHamburger})
  }

  render() {
    const {showHamburger} = this.state

    return (
      <SearchContext.Consumer>
        {value => {
          const {
            searchInput,
            showMobileSearchBar,
            updatedSearchInput,
            updatedShowMobileSearchBar,
            updatedNotShowingBarPageResult,
            getUserSearchResult,
          } = value

          return (
            <>
              <nav className="navbar-container">
                <Link to="/" className="classname-link">
                  <div className="website-logo-name-card">
                    <img
                      className="header-website-logo"
                      src="https://res.cloudinary.com/dmogabwqz/image/upload/v1726920837/logo_ynun8y.png"
                      alt="website logo"
                    />
                    <h1 className="header-instashare-heading">Insta Share</h1>
                  </div>
                </Link>
                <div className="desktop-hamburger-menu-card">
                  <div className="header-desktop-search-card">
                    <input
                      className="header-desktop-search-input"
                      type="search"
                      placeholder="Search Caption"
                      value={searchInput}
                      onChange={updatedSearchInput}
                    />
                    <button
                      className="header-desktop-search-icon-btn"
                      type="button"
                      onClick={getUserSearchResult}
                    >
                      <Link to="/" className="classname-link">
                        <FaSearch
                          className="header-desktop-search-icon"
                          testid="searchIcon"
                        />
                      </Link>
                    </button>
                  </div>
                  <Link to="/" className="classname-link">
                    <button
                      className="text-btn-none"
                      type="button"
                      onClick={updatedNotShowingBarPageResult}
                    >
                      <p className="header-menulist-desktop-heading">Home</p>
                    </button>
                  </Link>
                  <Link to="/my-profile" className="classname-link">
                    <button
                      className="text-btn-none"
                      type="button"
                      onClick={updatedNotShowingBarPageResult}
                    >
                      <p className="header-menulist-desktop-heading">Profile</p>
                    </button>
                  </Link>
                  <button
                    onClick={this.onClickLogoutBtn}
                    className="header-desktop-logout-btn"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
                <button
                  className="text-btn-none"
                  type="button"
                  onClick={this.onClickHamburger}
                >
                  <IoIosMenu className="hamburger-icon" />
                </button>
              </nav>
              {showHamburger && (
                <div className="hamburger-menu-card">
                  <Link to="/" className="classname-link">
                    <button
                      className="text-btn-none"
                      type="button"
                      onClick={this.onClickHamburger}
                    >
                      <h1
                        className="header-menulist-heading"
                        onClick={updatedNotShowingBarPageResult}
                      >
                        Home
                      </h1>
                    </button>
                  </Link>
                  <Link to="/" className="classname-link">
                    <button
                      className="text-btn-none"
                      type="button"
                      onClick={this.onClickHamburger}
                    >
                      <h1
                        className="header-menulist-heading"
                        onClick={updatedShowMobileSearchBar}
                      >
                        Search
                      </h1>
                    </button>
                  </Link>
                  <Link to="/my-profile" className="classname-link">
                    <button
                      className="text-btn-none"
                      type="button"
                      onClick={this.onClickHamburger}
                    >
                      <h1
                        className="header-menulist-heading"
                        onClick={updatedNotShowingBarPageResult}
                      >
                        Profile
                      </h1>
                    </button>
                  </Link>
                  <button
                    onClick={this.onClickLogoutBtn}
                    className="header-logout-btn"
                    type="button"
                  >
                    Logout
                  </button>
                  <button
                    className="text-btn-none"
                    type="button"
                    onClick={this.onClickHamburger}
                  >
                    <MdCancel className="header-cancel-icon" />
                  </button>
                </div>
              )}
              {showMobileSearchBar && (
                <div className="header-mobile-search-card">
                  <input
                    className="header-mobile-search-input"
                    type="search"
                    placeholder="Search Caption"
                    value={searchInput}
                    onChange={updatedSearchInput}
                  />
                  <button
                    className="header-mobile-search-icon-btn"
                    type="button"
                    onClick={getUserSearchResult}
                  >
                    <FaSearch
                      className="header-mobile-search-icon"
                      testid="searchIcon"
                    />
                  </button>
                </div>
              )}
            </>
          )
        }}
      </SearchContext.Consumer>
    )
  }
}

export default withRouter(Header)
