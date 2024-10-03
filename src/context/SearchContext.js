import React from 'react'

const SearchContext = React.createContext({
  searchInput: '',
  updatedSearchInput: () => {},
  showMobileSearchBar: false,
  updatedShowMobileSearchBar: () => {},
  showMobileSearchPage: false,
  showSearchResult: false,
  updatedNotShowingBarPageResult: () => {},
  getUserSearchResult: () => {},
  userSearchList: [],
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  renderLoading: () => {},
  renderSuccess: () => {},
  renderFailure: () => {},
  onUserSearchToggleLikeIcon: () => {},
})

export default SearchContext
