import React from "react"

import {
  FormInputHeader,
  FormInputContainer,
  FormInputLabel,
  FormInputInput,
  FormButtonContainer,
  FormButtonButton,
  FormInputText,
} from "./SignUp.styles"

const SignUp = (props) => {
  const { data, handleInputChange, handleAuthFlow, isDisabled } = props
  return (
    <>
      <FormInputHeader>Sign Up</FormInputHeader>
      <FormInputContainer>
        <FormInputLabel htmlFor="email">Email</FormInputLabel>
        <FormInputInput
          id="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(evt) => handleInputChange("email", evt.target.value)}
        />
      </FormInputContainer>

      <FormInputContainer>
        <FormInputLabel htmlFor="password">Password</FormInputLabel>
        <FormInputInput
          id="password"
          type="password"
          placeholder="******************"
          value={data.password}
          onChange={(evt) => handleInputChange("password", evt.target.value)}
        />
        <FormInputText>Please choose your password</FormInputText>
      </FormInputContainer>

      <FormButtonContainer>
        <FormButtonButton
          disabled={isDisabled}
          type="button"
          onClick={handleAuthFlow}
        >
          Sign Up
        </FormButtonButton>
      </FormButtonContainer>
    </>
  )
}

export default SignUp
