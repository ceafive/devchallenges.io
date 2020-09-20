import styled from "styled-components/macro"
import tw from "twin.macro"
import { motion } from "framer-motion"

export const ModalBoxContainer = styled(motion.div)`
  ${tw`flex flex-col justify-center items-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-dropBack`}
  overflow-y: hidden;
`

export const ModalBoxContent = styled(motion.div)`
  ${tw`flex flex-col justify-center relative p-8 md:p-10 border border-gray-500 m-auto bg-white rounded-12px`}

  width: 310px;
  height: 367px;

  @media screen and (min-width: 500px) {
    width: 620px;
    height: 367px;
  }
`
export const ModalBoxHeaderCloseButton = styled.button`
  ${tw`font-bold text-red-500 text-xl mb-4 focus:outline-none`}
`

export const ModalBoxFooterContainer = styled.div`
  ${tw`flex items-center justify-between w-full`}
`

export const ModalBoxButtonContainer = styled.div`
  ${tw`flex items-center justify-end w-full`}
`

export const ModalBoxButtonLink = styled.button`
  ${(props) =>
    props.disabled
      ? tw`cursor-not-allowed`
      : tw`hover:text-gray-800 cursor-pointer`}
  ${tw`inline-block align-baseline font-bold text-xs md:text-sm text-gray-500 mr-4 focus:outline-none`}
`

export const ModalBoxButtonButton = styled.button`
  ${(props) =>
    props.disabled
      ? tw`bg-gray-500 cursor-not-allowed`
      : props.isDelete && !props.disabled
      ? tw`bg-red-500 hover:bg-red-700 shadow-shadow1`
      : tw`bg-textSecondary hover:bg-green-700 shadow-shadow1`}

  ${tw`flex justify-center items-center text-white text-xs md:text-base font-bold py-2 px-3 md:py-3 md:px-6 rounded-24px focus:outline-none `}
`

export const ModalBoxSwitcher = styled.button`
  ${tw`text-blue-500 text-xs font-bold focus:outline-none`}
`

export const ModalBoxError = styled.p`
  ${tw`font-bold text-xs mt-2 text-center transition-colors duration-100 ease-in`}
  ${(props) => (props.message.error ? tw`text-red-500` : tw`text-green-500`)}
`
