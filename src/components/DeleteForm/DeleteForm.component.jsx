import React from "react"
import PropTypes from "prop-types"
import {
  DeleteFormHeader,
  DeleteFormLabel,
  DeleteFormInput,
} from "./DeleteForm.styles"

const DeleteForm = (props) => {
  const { handlePasswordConfirm, passwordConfirm } = props

  return (
    <>
      <DeleteFormHeader>Are you sure?</DeleteFormHeader>
      <DeleteFormLabel>Password</DeleteFormLabel>
      <DeleteFormInput
        value={passwordConfirm}
        type="password"
        placeholder="******************"
        onChange={(evt) => handlePasswordConfirm(evt.target.value)}
      />
    </>
  )
}

DeleteForm.propTypes = {
  handlePasswordConfirm: PropTypes.func.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
}
export default DeleteForm
