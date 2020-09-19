import styled from "styled-components"
import tw from "twin.macro"
import { motion } from "framer-motion"
import { ReactComponent as NoImageSVG } from "../../assets/images/no_image.svg"

export const FileFormContainer = styled.div`
  ${tw`flex flex-col justify-center rounded-lg my-4`}
`
export const FileFormHeader = styled.h1`
  ${tw`font-bold text-black text-xl mb-4`}
`

export const FileFormOuterBox = styled.div`
  ${tw`relative flex flex-col items-center justify-center`}
`

export const FileFormInnerBox = styled(motion.div)`
  ${tw`flex flex-col items-center justify-center w-full`}
`

export const FileFormUploadBox = styled.div`
  ${tw`flex flex-col items-center justify-center w-full h-full`}
`

export const FileFormUploadBoxImage = styled(NoImageSVG)`
  ${tw`inline h-40 w-40`}
`
export const FileFormUploadBoxText = styled.p`
  ${tw`text-gray-500 text-sm`}
`

export const FileFormUploadBoxInput = styled.input`
  ${tw`absolute h-full w-full opacity-0`}
`

export const FileFormUploadBoxTextInputLabel = styled.label`
  ${tw`block text-textPrimary text-sm font-semibold mb-2 w-full`}
`
export const FileFormUploadBoxTextInput = styled.input`
  ${tw`shadow appearance-none border rounded-12px w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none mb-4`}

  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
`
