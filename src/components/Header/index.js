import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoIosMenu} from 'react-icons/io'
import {MdCancel} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  state = {showHamburger: false, searchInput: ''}

  onClickLogoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickShowHamburger = () => {
    const {showHamburger} = this.state
    this.setState({showHamburger: !showHamburger})
  }

  onClickCloseHamburger = () => {
    this.setState({showHamburger: false})
  }

  onChangeSearchInput = event =>
    this.setState({searchInput: event.target.value})

  onClickSearchBtn = () => {
    const {searchInput} = this.state
    console.log(searchInput)
  }

  render() {
    const {showHamburger} = this.state
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
                onChange={this.onChangeSearchInput}
              />
              <button
                className="header-desktop-search-icon-btn"
                type="button"
                onClick={this.onClickSearchBtn}
              >
                <FaSearch
                  className="header-desktop-search-icon"
                  testid="searchIcon"
                />
              </button>
            </div>
            <Link to="/" className="classname-link">
              <button className="text-btn-none" type="button">
                <p className="header-menulist-desktop-heading">Home</p>
              </button>
            </Link>
            <Link to="/my-profile" className="classname-link">
              <button className="text-btn-none" type="button">
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
          <IoIosMenu
            onClick={this.onClickShowHamburger}
            className="hamburger-icon"
          />
        </nav>
        {showHamburger && (
          <div className="hamburger-menu-card">
            <Link to="/" className="classname-link">
              <button className="text-btn-none" type="button">
                {' '}
                <h1 className="header-menulist-heading">Home</h1>{' '}
              </button>
            </Link>
            <Link to="/searchpage" className="classname-link">
              <button className="text-btn-none" type="button">
                {' '}
                <h1 className="header-menulist-heading">Search</h1>{' '}
              </button>
            </Link>
            <Link to="/my-profile" className="classname-link">
              <button className="text-btn-none" type="button">
                {' '}
                <h1 className="header-menulist-heading">Profile</h1>{' '}
              </button>
            </Link>
            <button
              onClick={this.onClickLogoutBtn}
              className="header-logout-btn"
              type="button"
            >
              Logout
            </button>
            <button className="text-btn-none" type="button">
              <MdCancel
                onClick={this.onClickCloseHamburger}
                className="header-cancel-icon"
              />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
