import React from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../utils/axios'
import SocialLogin from '../components/SocialLogin'

const Login = (props) => {
  const { setIsLogin } = props
  let history = useHistory()

  const loginFields = [
    { name: 'email', icon: 'mail', type: 'text' },
    { name: 'password', icon: 'lock-closed', type: 'password' },
  ]

  const initialData = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = React.useState(initialData)
  const [logginIn, setLogginIn] = React.useState(false)
  const [error, setError] = React.useState({
    status: false,
    message: '',
  })

  const login = async () => {
    try {
      setError({
        status: false,
        message: '',
      })
      setLogginIn(true)

      const res = await axios.post('/login', {
        ...formData,
      })
      const data = res.data
      const { auth } = data
      if (!auth) throw data
      // console.log(res)
      localStorage.setItem('dev-auth-app', JSON.stringify(data))
      setLogginIn(false)
      history.push('/profile')
    } catch (error) {
      console.log(error)
      setError({
        status: true,
        message: error.message,
      })
      setLogginIn(false)
    }
  }

  return (
    <div className="max-w-lg border border-gray-300 rounded-lg p-10 w-full">
      <div className="w-full">
        <h1 className="text-center text-xl font-bold">Login</h1>
        {loginFields.map((field) => {
          return (
            <div
              key={field.name}
              className="flex items-center border border-gray-300 rounded-lg p-2 my-2"
            >
              <ion-icon size="large" name={`${field.icon}-outline`}></ion-icon>
              <input
                type="text"
                placeholder={field.name}
                name={field.name}
                value={formData[field.name]}
                type={field.type}
                onChange={(e) => {
                  setFormData((data) => ({
                    ...data,
                    [e.target.name]: e.target.value,
                  }))
                }}
                className="bg-transparent placeholder-gray-700 w-full focus:outline-none p-2"
              />
            </div>
          )
        })}
        {error.status && <p className="text-center">{error.message}</p>}
        <button
          disabled={logginIn}
          className="w-full bg-blue-700 text-white rounded-lg py-3 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={login}
        >
          Login
        </button>

        <div id="auth-section">
          <p className="text-gray-300 text-center text-lg my-5">
            or continue with your social media profile
          </p>

          <SocialLogin />

          <div className="flex justify-center my-5">
            <p className="text-gray-300 text-center">
              Don't have an accout yet?
            </p>
            <button
              className="text-blue-700 focus:outline-none px-2"
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
