import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../utils/axios'

import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import GitHubLogin from 'react-login-github'

const SocialLogin = () => {
  let history = useHistory()

  const [error, setError] = React.useState({
    status: false,
    message: '',
  })

  const logos = [
    {
      name: 'google',
      render: ({ name }) => {
        return (
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID}
            onSuccess={(response) => {
              const { profileObj } = response
              siginIn(profileObj, 'google')
            }}
            onFailure={(err) => console.log({ err })}
            cookiePolicy={'none'}
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
    {
      name: 'facebook',
      render: ({ name }) => {
        return (
          <FacebookLogin
            autoLoad={false}
            appId={process.env.FACEBOOK_APP_ID}
            fields="name,email,picture.type(large)"
            callback={(response) => {
              siginIn(response, 'facebook')
            }}
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
            clientId={process.env.GITHUB_CLIENT_ID}
            scope="user"
            onSuccess={responseGithub}
            onFailure={() => console.log('failed')}
          >
            <ion-icon size="large" name={`logo-${name}`} />
          </GitHubLogin>
        )
      },
    },
  ]

  const siginIn = async (response, loginType) => {
    try {
      // add login type to response
      response.loginType = loginType
      const res = await axios.post('/social', response)
      const data = res.data
      const { auth } = data
      if (!auth) throw data

      // set user in localstorage
      localStorage.setItem('dev-auth-app', JSON.stringify(data))

      history.push('/profile')
    } catch (error) {
      console.log(error.response.data.message)
      setError({
        status: true,
        message: error.response.data.message,
      })
    }
  }

  const responseGithub = async (response) => {
    const data = new FormData()
    data.append('client_id', process.env.GITHUB_CLIENT_ID)
    data.append('client_secret', process.env.GITHUB_CLIENT_SECRET)
    data.append('code', response.code)
    data.append('redirect_uri', process.env.GITHUB_REDIRECT_URI)

    try {
      const resToken = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
        data
      )
      const token = resToken.data
      const splitToken = token.split('&')

      let access_token = ''
      splitToken.forEach((data) => {
        if (data.includes('access_token')) {
          const split = data.split('=')
          return (access_token = split[1])
        }
      })

      const resUser = await axios.post(
        `https://cors-anywhere.herokuapp.com/https://api.github.com/user`,
        null,
        {
          headers: {
            Accept: `application/vnd.github.v3+json`,
            Authorization: `token ${access_token}`,
            'X-OAuth-Scopes': `user`,
          },
        }
      )
      const user = resUser.data
      siginIn(user, 'github')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <>
      {error.status && (
        <p className="text-center text-red-500">{error.message}</p>
      )}
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
