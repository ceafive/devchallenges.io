import React from "react"
import {
  ImageModalContainer,
  ImageModalContent,
  ImageModalHeader,
  ImageModalImage,
} from "./ImageModal.styles"

const ImageModal = (props) => {
  const { imageToDisplay, openImageModal } = props
  const { photoURL, label } = imageToDisplay
  return (
    <ImageModalContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={(evt) => {
        if (evt.target.classList.contains("close-trigger")) {
          openImageModal("", false)
        }
      }}
    >
      <ImageModalContent
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1], opacity: 1 }}
      >
        <ImageModalImage src={photoURL} alt={label} />
        <ImageModalHeader>{label}</ImageModalHeader>
      </ImageModalContent>
    </ImageModalContainer>
  )
}

export default ImageModal
