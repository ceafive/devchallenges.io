import React from "react"
import PropTypes from "prop-types"
import {
  GridContainer,
  GridButton,
  GridImage,
  MasonryGrid,
  GridLabel,
  GridNoImages,
} from "./Grid.styles"

// const breakpointColumnsObj = {
//   default: 4,
//   1100: 3,
//   700: 2,
//   500: 1,
// }

const Grid = (props) => {
  const {
    userData: { imagesArray },
    handleModal,
    openImageModal,
  } = props

  return (
    <>
      <MasonryGrid breakpointCols={4} columnClassName="my-masonry-grid_column">
        {imagesArray.map((img, index) => {
          return (
            <GridContainer
              layout
              whileHover={{ opacity: 1, scale: 1.1 }}
              // whileTap={{ scale: 1.5 }}
              transition={{ duration: 0.2 }}
              key={index}
            >
              <GridImage
                onClick={() => openImageModal(img)}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                src={img.photoURL}
                alt={img.label}
              />
              <GridLabel>{img.label}</GridLabel>
              <GridButton onClick={() => handleModal(true, true, index)}>
                Delete
              </GridButton>
            </GridContainer>
          )
        })}
      </MasonryGrid>
      {imagesArray.length === 0 && <GridNoImages>No Images</GridNoImages>}
    </>
  )
}

Grid.propTypes = {
  userData: PropTypes.object,
  handleModal: PropTypes.func.isRequired,
  openImageModal: PropTypes.func.isRequired,
}

export default Grid
