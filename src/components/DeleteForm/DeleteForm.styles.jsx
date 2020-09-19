import styled from "styled-components/macro"
import tw from "twin.macro"

export const DeleteFormLabel = styled.label`
  ${tw`block text-textPrimary text-sm font-semibold mb-2`}
`
export const DeleteFormInput = styled.input`
  ${tw`shadow appearance-none border rounded-12px w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none mb-4`}

  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
`
export const DeleteFormHeader = styled.h1`
  ${tw`font-bold text-black text-xl mb-4`}
`
