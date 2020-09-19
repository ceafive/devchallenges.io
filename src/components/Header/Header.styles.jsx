import styled from "styled-components/macro"
import tw from "twin.macro"

import { ReactComponent as LogoSVG } from "../../assets/images/my_unsplash_logo.svg"
import { ReactComponent as SearchSVG } from "../../assets/images/search.svg"

export const HeaderContainer = styled.div`
  ${tw`flex justify-between items-center`}
`
export const LogoContainer = styled.div`
  ${tw`flex justify-between items-center xl:w-1/4`}
`
export const Logo = styled(LogoSVG)``

export const SearchField = styled.div`
  ${tw`relative`}
`

export const SearchLensContainer = styled.div`
  ${tw`pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700`}
`

export const SearchLens = styled(SearchSVG)`
  ${tw`fill-current h-4 w-4`}
`

export const SearchBar = styled.input`
  ${tw`appearance-none border rounded-24px w-full py-2 px-6 text-gray-700 leading-tight focus:outline-none border-solid`}
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
`
export const ButtonsContainer = styled.div`
  ${tw`flex justify-between items-center w-1/5 xl:w-1/6`}
`

export const AddPhotoButton = styled.button`
  ${tw`bg-green-500 px-4 py-2 rounded-24px text-white font-bold leading-7 text-sm focus:outline-none`}
`

export const SignOutButton = styled.button`
  ${tw`bg-black px-4 py-2 rounded-24px text-white font-bold leading-7 text-sm focus:outline-none`}
`
