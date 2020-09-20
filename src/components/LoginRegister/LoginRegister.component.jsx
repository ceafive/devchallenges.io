import React from "react"
import { useHistory } from "react-router-dom"
import firebase from "../../utils/firebase"
import {
  authService,
  sendToLocalStorage,
  handleAddUserToFirestore,
  handleUpdateUserInFirestore,
  sleep,
} from "../../utils"

import {
  LoginRegisterContainer,
  AuthContainer,
  AuthFooterContainer,
  AuthFooterText,
  AuthFooterButton,
  AuthError,
} from "./LoginRegister.styles"
import Login from "../Login/Login.component"
import SignUp from "../SignUp/SignUp.component"

const initialState = {
  email: "",
  password: "",
}

const LoginRegister = () => {
  const history = useHistory()
  const [isLogin, setIsLogin] = React.useState(true)
  const [formData, setFormData] = React.useState(initialState)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [authenticating, setAuthenticating] = React.useState(false)

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleAuthFlow = async () => {
    try {
      setErrorMessage("")
      setAuthenticating(true)
      const { email, password } = formData
      if (!email || !password) {
        setErrorMessage("Enter email and password")
        setAuthenticating(false)
        return false
      }

      if (isLogin) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      }

      if (!isLogin) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
      }

      firebase.auth().onAuthStateChanged(async (user) => {
        try {
          if (!user) throw new Error("error getting user")
          user.password = formData.password
          let userData

          if (isLogin) {
            userData = await handleUpdateUserInFirestore(user)
          }

          if (!isLogin) {
            userData = await handleAddUserToFirestore(user)
          }

          if (!userData) throw userData

          // propagate user through entire app
          userData.auth = true
          authService.setUser(userData)
          sendToLocalStorage(userData)
          setAuthenticating(false)

          await sleep(1500).then(() => {
            history.push("/gallery")
            setFormData(initialState)
          })
        } catch (error) {
          setAuthenticating(false)
          setErrorMessage("An error occurred. Try again.")
          console.log(error)
        }
      })
    } catch (error) {
      setAuthenticating(false)
      setFormData(initialState)
      setErrorMessage(error.message)
      console.log(error)
    }
  }

  const renderForm = () => {
    setIsLogin(!isLogin)
    setFormData(initialState)
    setErrorMessage("")
  }

  return (
    <LoginRegisterContainer>
      <AuthContainer>
        {isLogin && (
          <Login
            isDisabled={authenticating}
            data={formData}
            handleInputChange={handleInputChange}
            handleAuthFlow={handleAuthFlow}
          />
        )}
        {!isLogin && (
          <SignUp
            isDisabled={authenticating}
            data={formData}
            handleInputChange={handleInputChange}
            handleAuthFlow={handleAuthFlow}
          />
        )}
        <AuthFooterContainer>
          <AuthFooterText>
            {isLogin ? ` Don't have an account?` : `Have an account?`}
          </AuthFooterText>
          <AuthFooterButton onClick={renderForm}>
            {isLogin ? `Sign Up` : `Login`}
          </AuthFooterButton>
        </AuthFooterContainer>
      </AuthContainer>

      <AuthError>{errorMessage}</AuthError>
    </LoginRegisterContainer>
  )
}

export default LoginRegister
