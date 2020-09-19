import React from "react"
import PropTypes from "prop-types"

import { URLFormLabel, URLFormInput, URLFormHeader } from "./URLForm.styles"

const URLForm = (props) => {
  const { newPhotoData, handleChange, photoTaskRunning } = props
  return (
    <>
      <URLFormHeader>Add a new photo</URLFormHeader>
      <URLFormLabel>Photo Label</URLFormLabel>
      <URLFormInput
        value={newPhotoData.label}
        placeholder="A Sunny Day!!!!!"
        onChange={(evt) => handleChange("label", evt.target.value)}
      />

      <URLFormLabel>Photo URL</URLFormLabel>
      <URLFormInput
        disabled={photoTaskRunning}
        value={newPhotoData.photoURL}
        placeholder="https://images.unsplash.com/photo-1600191763437-4262cefe23ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        onChange={(evt) => handleChange("photoURL", evt.target.value)}
      />
    </>
  )
}

URLForm.propTypes = {
  newPhotoData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default URLForm
