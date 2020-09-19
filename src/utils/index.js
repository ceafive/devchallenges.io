import firebase from "./firebase"
import bcrypt from "bcryptjs"
import { Subject } from "rxjs"

const subject = new Subject()
export const authService = {
  setUser: (user) => subject.next(user),
  removeUser: () => subject.next(null),
  getUser: () => subject.asObservable(),
}

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10)
  return hash
}

export const handleAddUserToFirestore = async (user) => {
  try {
    const db = firebase.firestore()
    const userRef = db.collection("users").doc(user.uid)
    // create password hash and send to firestore
    const passwordHash = await hashPassword(user.password)

    await userRef.set({
      id: user.uid,
      email: user.email,
      password: passwordHash,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
      imagesArray: [],
    })

    const userDoc = await userRef.get()
    const userData = userDoc.data()

    return userData
  } catch (error) {
    console.log(error)
    return false
  }
}

export const handleUpdateUserInFirestore = async (user) => {
  try {
    const db = firebase.firestore()
    const userRef = db.collection("users").doc(user.uid)

    await userRef.update({
      lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
    })

    const userDoc = await userRef.get()
    const userData = userDoc.data()

    return userData
  } catch (error) {
    console.log(error)
    return false
  }
}

export const comparePassword = async (password, passwordHash) => {
  const match = await bcrypt.compare(password, passwordHash)
  return match
}

export const sendToLocalStorage = (data) => {
  const isWindow = typeof window !== undefined
  if (!isWindow) {
    // check for localstorage
    console.error("window is undefined")
    return false
  }

  const uploaderCreds = window.localStorage.setItem(
    "uploaderCreds",
    JSON.stringify(data)
  )
  return uploaderCreds
}

export const retrieveFromLocalStorage = (key) => {
  const isWindow = typeof window !== undefined
  if (!isWindow) {
    // check for localstorage
    console.error("window is undefined")
    return false
  }

  const getCreds = window.localStorage.getItem(key)
  const uploaderCreds = JSON.parse(getCreds)
  return uploaderCreds
}

export const clearFromLocalStorage = (key) => {
  const isWindow = typeof window !== undefined
  if (!isWindow) {
    // check for localstorage
    console.error("window is undefined")
    return false
  }

  window.localStorage.removeItem(key)
}

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const testValidImage = (url, callback, timeout) => {
  try {
    timeout = timeout || 5000
    var timedOut = false,
      timer
    var img = new Image()
    img.onerror = img.onabort = function () {
      if (!timedOut) {
        clearTimeout(timer)
        callback(url, "error")
      }
    }
    img.onload = function () {
      if (!timedOut) {
        clearTimeout(timer)
        callback(url, "success")
      }
    }
    img.src = url
    timer = setTimeout(function () {
      timedOut = true
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = "//!!!!/test.jpg"
      callback(url, "timeout")
    }, timeout)
  } catch (error) {
    console.log(error)
  }
}
