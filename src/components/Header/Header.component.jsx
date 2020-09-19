import React from "react"

import PropTypes from "prop-types"

import {
  HeaderContainer,
  LogoContainer,
  Logo,
  SearchBar,
  SearchField,
  SearchLens,
  SearchLensContainer,
  ButtonsContainer,
  AddPhotoButton,
  SignOutButton,
} from "./Header.styles"

const Header = (props) => {
  const { handleSignout, handleModal, handleSearch, searchString } = props

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo />
        <SearchField>
          <SearchLensContainer>
            <SearchLens />
          </SearchLensContainer>
          <SearchBar
            type="text"
            placeholder="Search by name"
            value={searchString}
            onChange={(evt) => handleSearch(evt.target.value)}
          />
        </SearchField>
      </LogoContainer>
      <ButtonsContainer>
        <SignOutButton onClick={handleSignout}>Sign Out</SignOutButton>
        <AddPhotoButton onClick={() => handleModal(true)}>
          Add A Photo
        </AddPhotoButton>
      </ButtonsContainer>
    </HeaderContainer>
  )
}

Header.propTypes = {
  handleSignout: PropTypes.func.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
}

export default Header
