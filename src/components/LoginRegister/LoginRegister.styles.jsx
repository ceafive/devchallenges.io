import styled from "styled-components/macro"
import tw from "twin.macro"

export const LoginRegisterContainer = styled.div`
  ${tw`flex flex-col justify-center items-center w-full h-full bg-gray-100`}
`

export const AuthContainer = styled.div`
  ${tw`w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8`}
`
export const AuthFooterContainer = styled.div`
  ${tw`flex justify-between items-center w-full`}
`
export const AuthFooterText = styled.p`
  ${tw`text-gray-500 text-xs`}
`

export const AuthFooterButton = styled.button`
  ${tw`text-blue-500 text-xs font-bold focus:outline-none`}
`

export const AuthError = styled.p`
  ${tw`text-red-500 text-xs mt-2 text-center`}
`
