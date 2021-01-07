import React from 'react'
import axios from '../utils/axios'

import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GitHubLogin from 'react-github-login'

const SocialLogin = () => {
  const logos = [
    {
      name: 'google',
      render: ({ name }) => {
        return (
          <GoogleLogin
            clientId="229604138683-tu719sktt7ic2ge17a04f89qkjt9u7kd.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                className="focus:outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <ion-icon size="large" name={`logo-${name}`}></ion-icon>
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'none'}
          />
        )
      },
    },
    {
      name: 'facebook',
      render: ({ name }) => {
        return (
          <FacebookLogin
            autoLoad={false}
            appId="1079001142513208"
            fields="name,email"
            callback={responseGoogle}
            render={(renderProps) => (
              <button
                className="focus:outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <ion-icon size="large" name={`logo-${name}`}></ion-icon>
              </button>
            )}
          />
        )
      },
    },
    { name: 'twitter', render: () => {} },
    {
      name: 'github',
      render: ({ name }) => {
        return (
          <GitHubLogin
            className="focus:outline-none"
            clientId="4956b6264707078f20e4"
            redirectUri=""
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
          >
            <ion-icon size="large" name={`logo-${name}`}></ion-icon>
          </GitHubLogin>
        )
      },
    },
  ]

  const siginIn = async (route) => {
    try {
      const res = await axios.get(`/${route}`)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const responseGoogle = (response) => {
    console.log(response)
  }

  return (
    <>
      <div className="flex justify-between px-10">
        {logos.map((logo) => {
          return (
            <React.Fragment key={logo.name}>{logo.render(logo)}</React.Fragment>
          )
        })}
      </div>
    </>
  )
}

export default SocialLogin
