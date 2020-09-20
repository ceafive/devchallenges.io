import styled from "styled-components/macro"
import tw from "twin.macro"
import Masonry from "react-masonry-css"
import { motion } from "framer-motion"

export const MasonryGrid = styled(Masonry)`
  ${tw`flex py-10 px-10 md:px-20 w-full h-full`}
`

export const GridContainer = styled(motion.div)`
  ${tw`relative rounded-24px overflow-hidden mb-8 flex justify-center items-center`}

  min-height: 200px;
  min-width: 200px;

  @media screen and (max-width: 800px) {
    ${tw`mb-4`}
  }

  opacity: 0.8;
`

export const GridImage = styled(motion.img)`
  ${tw`cursor-pointer rounded-24px`}
`

export const GridLabel = styled.p`
  ${tw`absolute bottom-0 left-0 text-gray-100 shadow-2xl m-6 hidden font-display font-semibold`}

  /* background-color: rgba(0,0,0,0.1); */
  ${GridContainer}:hover & {
    ${tw`block`}
  }
`

export const GridButton = styled.button`
  ${tw`absolute top-0 right-0 text-red-500 m-5 hidden lowercase font-display font-semibold border border-colorBorder py-1 px-3 rounded-12px focus:outline-none`}

  ${GridContainer}:hover & {
    ${tw`block`}
  }
`

export const GridNoImages = styled.h1`
  ${tw`text-black text-2xl text-center font-bold w-full h-full`}
`
