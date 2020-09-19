import styled from "styled-components/macro"
import tw from "twin.macro"

export const FormInputHeader = styled.h1`
  ${tw`text-center font-bold text-black text-lg`}
`

export const FormInputContainer = styled.div`
  ${tw`mb-4`}
`
export const FormInputLabel = styled.label`
  ${tw`block text-gray-700 text-sm font-bold mb-2`}
`
export const FormInputInput = styled.input`
  ${tw`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
`
export const FormInputText = styled.p`
  ${tw`text-red-500 text-xs italic`}
`

export const FormButtonContainer = styled.div`
  ${tw`flex items-center justify-between mb-4`}
`

export const FormButtonButton = styled.button`
  ${tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
`

export const FormButtonLink = styled.a`
  ${tw`inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800`}
`
