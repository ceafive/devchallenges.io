import styled from "styled-components/macro"
import tw from "twin.macro"

export const URLFormLabel = styled.label`
  ${tw`block text-textPrimary text-sm font-semibold mb-2`}
`
export const URLFormInput = styled.input`
  ${tw`shadow appearance-none border rounded-12px w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none mb-4`}

  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
`
export const URLFormHeader = styled.h1`
  ${tw`font-bold text-black text-xl mb-4`}
`
export const URLFormHeaderContainer = styled.div`
  ${tw`flex items-center justify-between w-full`}
`
export const URLFormHeaderCloseButton = styled.button`
  ${tw`font-bold text-red-500 text-xl mb-4 focus:outline-none`}
`
