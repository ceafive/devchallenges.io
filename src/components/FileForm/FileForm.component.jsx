import React from "react"

import {
  FileFormHeader,
  FileFormContainer,
  FileFormOuterBox,
  FileFormUploadBox,
  FileFormUploadBoxImage,
  FileFormUploadBoxInput,
  FileFormUploadBoxText,
  FileFormUploadBoxTextInput,
  FileFormUploadBoxTextInputLabel,
  FileFormInnerBox,
} from "./FileForm.styles"

const FileForm = (props) => {
  const { newPhotoData, handleFileInputChange, photoTaskRunning } = props

  return (
    <FileFormContainer>
      <FileFormHeader>Upload your image</FileFormHeader>
      <FileFormOuterBox>
        <FileFormUploadBox>
          {!newPhotoData.file && (
            <FileFormInnerBox transition={{ duration: 0.5 }}>
              <FileFormUploadBoxImage />
              <FileFormUploadBoxText>
                Drag and drop your image here or click to upload
              </FileFormUploadBoxText>
              <FileFormUploadBoxInput
                type="file"
                name="image"
                accept="image/png, image/jpeg"
                // value={newPhotoData.file}
                onChange={(evt) =>
                  handleFileInputChange("file", evt.target.files[0])
                }
              />
            </FileFormInnerBox>
          )}
          {newPhotoData.file && (
            <FileFormInnerBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FileFormUploadBoxTextInputLabel>
                Enter Image Label
              </FileFormUploadBoxTextInputLabel>
              <FileFormUploadBoxTextInput
                disabled={photoTaskRunning}
                isTextInput
                type="text"
                value={newPhotoData.fileLabel}
                onChange={(evt) =>
                  handleFileInputChange("fileLabel", evt.target.value)
                }
              />
            </FileFormInnerBox>
          )}
        </FileFormUploadBox>
      </FileFormOuterBox>
    </FileFormContainer>
  )
}

export default FileForm
