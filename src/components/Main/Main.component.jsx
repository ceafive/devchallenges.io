import React from "react"
import { useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import { MainContainer } from "./Main.styles"
import Header from "../Header/Header.component"
import Grid from "../Grid/Grid.component"
import ModalBox from "../ModalBox/ModalBox.component"
import ImageModal from "../ImageModal/ImageModal.component"

import {
  authService,
  clearFromLocalStorage,
  retrieveFromLocalStorage,
  sendToLocalStorage,
  testValidImage,
  comparePassword,
  sleep,
} from "../../utils"
import firebase from "../../utils/firebase"

const initialData = {
  label: "",
  photoURL: "",
  fileLabel: "",
  file: "",
}

const Main = (props) => {
  const history = useHistory()
  const { userData } = props
  const [showModal, setShowModal] = React.useState({
    type: "",
    condition: false,
  })
  const [showImageModal, setShowImageModal] = React.useState(false)
  const [newPhotoData, setNewPhotoData] = React.useState(initialData)
  const [photoTaskRunning, setPhotoTaskRunning] = React.useState(false)
  const [passwordConfirm, setPasswordConfirm] = React.useState("")
  const [indexOfImageToDelete, setIndexOfImageToDelete] = React.useState(null)
  const [imageToDisplay, setImageToDisplay] = React.useState(null)
  const [searchString, setSearchString] = React.useState("")
  const [uploadType, setuploadType] = React.useState("url")
  const [message, setMessage] = React.useState({
    error: false,
    message: "",
  })

  const handleChange = (field, value) => {
    setNewPhotoData({ ...newPhotoData, [field]: value })
  }

  const handleFileInputChange = (field, value) => {
    setNewPhotoData({ ...newPhotoData, [field]: value })
  }

  const handleChangeUploadType = (type) => {
    setuploadType(type)
    setNewPhotoData(initialData)
  }

  const handlePasswordConfirm = (value) => {
    setPasswordConfirm(value)
  }

  const handleSignout = () => {
    clearFromLocalStorage("uploaderCreds")
    authService.removeUser()
    history.push("/")
  }

  const handleModal = async (condition, deleting = false, index = 0) => {
    if (deleting) {
      setPasswordConfirm("")
      setIndexOfImageToDelete(index)
      setShowModal({
        type: "delete",
        condition,
      })
    } else {
      setShowModal({
        type: "upload",
        condition,
      })
      setNewPhotoData(initialData)
    }
    setMessage({ error: false, message: "" })
  }

  const sendToFirestore = async (userData, url = "") => {
    try {
      const uploadPhotoURL = firebase
        .functions()
        .httpsCallable("uploadPhotoURL")
      const res = await uploadPhotoURL({ newPhotoData, uploadType, url })
      if (!res) throw res

      const { data } = res

      const newUserData = { ...userData, ...data }
      // update local storage
      sendToLocalStorage(newUserData)
      authService.setUser(newUserData)

      setNewPhotoData(initialData)
      setMessage({ error: false, message: `Photo Added!` })
      setPhotoTaskRunning(false)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadToStorage = async (userData, file) => {
    try {
      const storage = firebase.storage()
      const storageRef = storage.ref()

      const imageCollectionRef = storageRef.child("collections")
      const userRef = imageCollectionRef.child(`${userData.id}/${file.name}`)

      const metadata = {
        contentType: file.type,
      }

      await userRef.put(file, metadata).on(
        "state_changed",
        (snap) => {
          // let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
        },
        (err) => {
          setMessage({
            error: true,
            message: "File could not be uploaded. Please try again",
          })
          setPhotoTaskRunning(false)
        },
        async () => {
          let url = await userRef.getDownloadURL()
          if (!url) {
            setMessage({
              error: true,
              message: "File could not be uploaded. Please try again",
            })
            setPhotoTaskRunning(false)
            return false
          }
          if (url) await sendToFirestore(userData, url)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddPhoto = async () => {
    try {
      // upload utilities
      const types = ["image/png", "image/jpeg"]

      setMessage({ error: false, message: "" })
      setPhotoTaskRunning(true)
      const userData = await retrieveFromLocalStorage("uploaderCreds")

      if (uploadType === "file") {
        if (!newPhotoData.fileLabel || !newPhotoData.file) {
          setMessage({ error: true, message: "Please choose a file to upload" })
          setPhotoTaskRunning(false)
          return false
        }

        if (!types.includes(newPhotoData.file.type)) {
          setMessage({
            error: true,
            message: "You can only upload .jpg or .png files",
          })
          setPhotoTaskRunning(false)
          return false
        }

        await uploadToStorage(userData, newPhotoData.file)
      }

      if (uploadType === "url") {
        if (!newPhotoData.label || !newPhotoData.photoURL) {
          setMessage({ error: true, message: "Enter label and URL" })
          setPhotoTaskRunning(false)
          return false
        }

        // test photo string for valid image
        testValidImage(
          newPhotoData.photoURL,
          async function (url, result) {
            if (result === "error" || result === "timeout") {
              setMessage({
                error: true,
                message: `Image Link Not Valid. Check and correct!`,
              })
              setPhotoTaskRunning(false)
            } else {
              await sendToFirestore(userData)
            }
          },
          5000
        )
      }
    } catch (error) {
      console.log(error)
      setMessage({ error: true, message: `Photo Not Added!` })
      setNewPhotoData(initialData)
      setPhotoTaskRunning(false)
    } finally {
      await sleep(1000)
      // handleModal(false)
    }
  }

  const handleDeletePhoto = async () => {
    try {
      setMessage({ error: false, message: "" })
      setPhotoTaskRunning(true)
      if (!passwordConfirm) {
        setMessage({ error: true, message: "Enter password" })
        setPhotoTaskRunning(false)
        return false
      }

      const userData = await retrieveFromLocalStorage("uploaderCreds")
      const match = await comparePassword(passwordConfirm, userData.password)

      if (!match) {
        setMessage({
          error: true,
          message: `You have entered a wrong password!`,
        })
        setPhotoTaskRunning(false)
        return false
      }

      const deletePhotoURL = firebase
        .functions()
        .httpsCallable("deletePhotoURL")

      const res = await deletePhotoURL(indexOfImageToDelete)
      if (!res) throw res

      const { data } = res
      const newUserData = { ...userData, ...data }
      // update local storage
      sendToLocalStorage(newUserData)
      authService.setUser(newUserData)
      setMessage({ error: false, message: `Photo Deleted!` })
      setPhotoTaskRunning(false)
    } catch (error) {
      console.log(error)
      setMessage({ error: true, message: `Photo Not Deleted!` })
      setPhotoTaskRunning(false)
    } finally {
      await sleep(1000)
      // handleModal(false)
    }
  }

  const openImageModal = (img, condition = true) => {
    setShowImageModal(condition)
    setImageToDisplay(img)
  }

  const handleSearch = (str) => {
    setSearchString(str)
    const userData = retrieveFromLocalStorage("uploaderCreds")
    const imagesArray = userData.imagesArray
    const searchResult = userData.imagesArray
      .map((img) => img.label.toLowerCase())
      .filter((label) => label.includes(str.toLowerCase()))

    const returnedResults = imagesArray.filter((image) =>
      searchResult.includes(image.label.toLowerCase())
    )

    userData.imagesArray = returnedResults
    authService.setUser(userData)
  }

  return (
    <MainContainer>
      <Header
        searchString={searchString}
        handleSignout={handleSignout}
        handleModal={handleModal}
        handleSearch={handleSearch}
      />
      <Grid
        userData={userData}
        handleModal={handleModal}
        openImageModal={openImageModal}
      />
      {showModal && showModal.condition && (
        <ModalBox
          uploadType={uploadType}
          showModal={showModal}
          photoTaskRunning={photoTaskRunning}
          handleAddPhoto={handleAddPhoto}
          message={message}
          newPhotoData={newPhotoData}
          handleChange={handleChange}
          handleModal={handleModal}
          passwordConfirm={passwordConfirm}
          handlePasswordConfirm={handlePasswordConfirm}
          handleDeletePhoto={handleDeletePhoto}
          handleFileInputChange={handleFileInputChange}
          handleChangeUploadType={handleChangeUploadType}
        />
      )}

      {showImageModal && (
        <ImageModal
          imageToDisplay={imageToDisplay}
          openImageModal={openImageModal}
        />
      )}
    </MainContainer>
  )
}

Main.propTypes = {
  userData: PropTypes.object,
}

export default Main
