import styled from "styled-components/macro"
import tw from "twin.macro"

import { ReactComponent as LogoSVG } from "../../assets/images/my_unsplash_logo.svg"
import { ReactComponent as SearchSVG } from "../../assets/images/search.svg"

export const HeaderContainer = styled.div`
  ${tw`flex justify-between items-center w-full px-6 md:px-10 lg:px-20`}
`
export const LogoContainer = styled.div`
  ${tw`flex justify-between items-center sm:w-1/12 md:w-1/3 lg:w-1/4`}
`
export const Logo = styled(LogoSVG)`
  ${tw`hidden md:block`}
`

export const SearchField = styled.div`
  ${tw`relative`}
`
export const SearchLensContainer = styled.div`
  ${tw`pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 z-10`}
`
export const SearchLens = styled(SearchSVG)`
  ${tw`fill-current h-4 w-4`}
  color: #bdbdbd;
`
export const SearchClose = styled(SearchSVG)`
  ${tw`fill-current h-4 w-4`}
  color: #bdbdbd;
`

export const SearchBar = styled.input`
  ${tw`w-full py-2 pl-6 pr-2 md:py-3 md:pl-8 md:pr-6 text-xs md:text-base text-gray-700 leading-tight focus:outline-none`}

  ::placeholder {
    font-size: 14px;
    line-height: 19px;
    color: #bdbdbd;
  }

  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
  border-radius: 24px;
`
export const ButtonsContainer = styled.div`
  ${tw`flex justify-between items-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6`}
`
export const AddPhotoButton = styled.button`
  ${tw`p-2 md:p-4 rounded-24px text-white font-bold leading-none focus:outline-none`}

  font-size: 8px;

  @media screen and (min-width: 500px) {
    font-size: 14px;
  }

  background-color: #3db46d;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
`
export const SignOutButton = styled.button`
  ${tw`bg-black p-2 md:p-4 rounded-24px text-white font-bold leading-none focus:outline-none`}

  font-size: 8px;

  @media screen and (min-width: 500px) {
    font-size: 14px;
  }

  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
`
