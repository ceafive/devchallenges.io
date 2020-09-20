import React from "react"
import PropTypes from "prop-types"
import {
  DeleteFormHeader,
  DeleteFormLabel,
  DeleteFormInput,
  DeleteFormHeaderCloseButton,
  DeleteFormHeaderContainer,
} from "./DeleteForm.styles"

const DeleteForm = (props) => {
  const { handlePasswordConfirm, passwordConfirm, handleModal } = props

  return (
    <>
      <DeleteFormHeaderContainer>
        <DeleteFormHeader>Are you sure?</DeleteFormHeader>
        <DeleteFormHeaderCloseButton onClick={() => handleModal(false)}>
          X
        </DeleteFormHeaderCloseButton>
      </DeleteFormHeaderContainer>
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
