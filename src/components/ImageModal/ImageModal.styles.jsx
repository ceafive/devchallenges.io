import styled from "styled-components/macro"
import tw from "twin.macro"
import { motion } from "framer-motion"

export const ImageModalContainer = styled(motion.div)`
  ${tw`fixed z-10 left-0 top-0 w-full h-full bg-dropBack`}
  overflow-y: hidden;
`

export const ImageModalContent = styled(motion.div).attrs({
  className: "close-trigger",
})`
  ${tw`flex flex-col justify-center items-center w-full h-full`}
`

export const ImageModalHeader = styled.h1`
  ${tw`font-bold text-white text-center text-2xl w-full`}
`

export const ImageModalImage = styled.img`
  ${tw`block border-4 border-white`}

  max-width: 60%;
  max-height: 80%;
  margin: 0 auto;
  box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
`
