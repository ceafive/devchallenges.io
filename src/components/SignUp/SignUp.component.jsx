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
 
import Spinner from "../Spinner/Spinner.component"

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
        <FormInputText>
        {data.password.length === 0
            ? `Please choose your password`
            : data.password.length < 6
            ? `Password is too short`
            : ``}
        </FormInputText>
      </FormInputContainer>

      <FormButtonContainer>
        <FormButtonButton
          disabled={isDisabled}
          type="button"
          onClick={handleAuthFlow}
        >
          {isDisabled ? <Spinner /> : `Sign Up`}
        </FormButtonButton>
      </FormButtonContainer>
    </>
  )
}

export default SignUp
