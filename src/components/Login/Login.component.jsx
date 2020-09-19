import React from "react"
import PropTypes from "prop-types"

import {
  FormInputHeader,
  FormInputContainer,
  FormInputLabel,
  FormInputInput,
  FormButtonContainer,
  FormButtonButton,
  FormButtonLink,
  FormInputText,
} from "./Login.styles"

const Login = (props) => {
  const { data, handleInputChange, handleAuthFlow, isDisabled } = props
  return (
    <>
      <FormInputHeader>Login</FormInputHeader>
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
            ? `Please enter your password`
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
          Login
        </FormButtonButton>
        <FormButtonLink href="#">Forgot Password?</FormButtonLink>
      </FormButtonContainer>
    </>
  )
}

Login.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
}

export default Login
