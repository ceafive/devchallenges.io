import React from "react"
import PropTypes from "prop-types"

import Spinner from "../Spinner/Spinner.component"
import URLForm from "../URLForm/URLForm.component"
import DeleteForm from "../DeleteForm/DeleteForm.component"
import FileForm from "../FileForm/FileForm.component"

import {
  ModalBoxButtonButton,
  ModalBoxButtonContainer,
  ModalBoxButtonLink,
  ModalBoxContainer,
  ModalBoxContent,
  ModalBoxError,
  ModalBoxSwitcher,
  ModalBoxFooterContainer,
} from "./ModalBox.styles"

const ModalBox = (props) => {
  const {
    uploadType,
    showModal,
    handleModal,
    handleChange,
    newPhotoData,
    message,
    handleAddPhoto,
    photoTaskRunning,
    handlePasswordConfirm,
    passwordConfirm,
    handleDeletePhoto,
    handleFileInputChange,
    handleChangeUploadType,
  } = props

  const modalType = showModal.type

  return (
    <ModalBoxContainer
      className="close-trigger"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={(evt) => {
        if (evt.target.classList.contains("close-trigger")) {
          handleModal(false)
        }
      }}
    >
      <ModalBoxContent
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {modalType === "upload" && uploadType === "url" && (
          <URLForm
            handleModal={handleModal}
            handleChange={handleChange}
            newPhotoData={newPhotoData}
            photoTaskRunning={photoTaskRunning}
          />
        )}
        {modalType === "upload" && uploadType === "file" && (
          <FileForm
            handleModal={handleModal}
            newPhotoData={newPhotoData}
            handleFileInputChange={handleFileInputChange}
            photoTaskRunning={photoTaskRunning}
          />
        )}
        {modalType === "delete" && (
          <DeleteForm
            handleModal={handleModal}
            handlePasswordConfirm={handlePasswordConfirm}
            passwordConfirm={passwordConfirm}
          />
        )}
        <ModalBoxFooterContainer>
          {modalType === "upload" && (
            <ModalBoxSwitcher
              disabled={photoTaskRunning}
              onClick={() =>
                handleChangeUploadType(uploadType === "url" ? "file" : "url")
              }
            >
              {uploadType === "url"
                ? `Switch to file upload`
                : `Switch to URL upload`}
            </ModalBoxSwitcher>
          )}
          <ModalBoxButtonContainer>
            <ModalBoxButtonLink
              disabled={photoTaskRunning}
              onClick={() => handleModal(false)}
            >
              Cancel
            </ModalBoxButtonLink>
            <ModalBoxButtonButton
              isDelete={modalType === "delete"}
              disabled={
                photoTaskRunning ||
                (uploadType === "file" && !newPhotoData.fileLabel)
              }
              onClick={
                modalType === "upload" ? handleAddPhoto : handleDeletePhoto
              }
            >
              {photoTaskRunning ? (
                <Spinner />
              ) : modalType === "upload" ? (
                `Submit`
              ) : (
                `Delete`
              )}
            </ModalBoxButtonButton>
          </ModalBoxButtonContainer>
        </ModalBoxFooterContainer>
        <ModalBoxError message={message}>{message.message}</ModalBoxError>
      </ModalBoxContent>
    </ModalBoxContainer>
  )
}

ModalBox.propTypes = {
  photoTaskRunning: PropTypes.bool.isRequired,
  handleAddPhoto: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  newPhotoData: PropTypes.object.isRequired,
  handleModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  showModal: PropTypes.object.isRequired,
  handlePasswordConfirm: PropTypes.func.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  uploadType: PropTypes.string.isRequired,
  handleDeletePhoto: PropTypes.func.isRequired,
  handleChangeUploadType: PropTypes.func.isRequired,
}

export default ModalBox
