const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()

exports.uploadPhotoURL = functions.https.onCall(async (data, context) => {
  try {
    const userID = context.auth.uid
    if (!userID) return false

    const { newPhotoData, uploadType, url } = data

    let newImageDetails

    if (uploadType === "url") {
      newImageDetails = {
        label: newPhotoData.label,
        photoURL: newPhotoData.photoURL,
      }
    }

    if (uploadType === "file") {
      newImageDetails = {
        label: newPhotoData.fileLabel,
        photoURL: url,
      }
    }

    const db = admin.firestore()
    const userRef = db.collection("users").doc(userID)

    const userDoc = await userRef.get()
    const userData = userDoc.data()
    const userImagesArray = userData.imagesArray

    const reformatImagesArray = [newImageDetails, ...userImagesArray]

    await userRef.update({
      imagesArray: reformatImagesArray,
    })

    const newUserDoc = await userRef.get()
    const newUserData = newUserDoc.data()
    return newUserData
  } catch (error) {
    console.log(error)
    return error
  }
})

exports.deletePhotoURL = functions.https.onCall(async (index, context) => {
  try {
    const userID = context.auth.uid
    if (!userID) return false

    const db = admin.firestore()
    const userRef = db.collection("users").doc(userID)

    const userDoc = await userRef.get()
    const userData = userDoc.data()
    const userImagesArray = userData.imagesArray

    userImagesArray.splice(index, 1)
    await userRef.update({
      imagesArray: userImagesArray,
    })

    const newUserDoc = await userRef.get()
    const newUserData = newUserDoc.data()
    return newUserData
  } catch (error) {
    console.log(error)
    return error
  }
})
