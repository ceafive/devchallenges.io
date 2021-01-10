import React from 'react'
import { useHistory } from 'react-router-dom'

import axios from '../utils/axios'

import SocialLogin from '../components/SocialLogin'

const Register = (props) => {
  const { setIsLogin } = props
  let history = useHistory()

  const loginFields = [
    { name: 'email', icon: 'mail', type: 'text' },
    { name: 'password', icon: 'lock-closed', type: 'password' },
  ]

  const logos = ['google', 'facebook', 'twitter', 'github']

  const initialData = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = React.useState(initialData)
  const [registering, setRegistering] = React.useState(false)
  const [error, setError] = React.useState({
    status: false,
    message: '',
  })
  const [disableButton, setDisableButton] = React.useState(false)

  React.useEffect(() => {
    handleValidation()
  }, [formData])

  const handleValidation = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    Object.keys(formData).map((dataKey) => {
      if (dataKey === 'email') {
        if (!formData[dataKey] || !emailRegex.test(formData[dataKey])) {
          return setDisableButton(true)
        } else return setDisableButton(false)
      }

      if (dataKey === 'password') {
        if (!formData[dataKey] || formData[dataKey].length < 6) {
          return setDisableButton(true)
        }
      } else return setDisableButton(false)
    })
  }

  const register = async () => {
    try {
      setError({
        status: false,
        message: '',
      })
      setRegistering(true)
      const res = await axios.post('/register', {
        ...formData,
      })

      const data = res.data
      const { auth } = data
      if (!auth) throw data

      localStorage.setItem('dev-auth-app', JSON.stringify(data))
      setRegistering(false)
      history.push('/profile')
    } catch (error) {
      console.log(error)
      setError({
        status: true,
        message: error.response.data.message,
      })
      setRegistering(false)
      // setFormData(initialData)
    }
  }

  return (
    <div className="max-w-lg border border-gray-300 rounded-lg p-10 w-full">
      <div className="w-full">
        <h1 className="text-center text-xl font-bold">Register</h1>
        <p className="text-gray-300 font-black text-center text-xl my-3">
          Join thousands of learners from around the world
        </p>
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
        {error.status && (
          <p className="text-center text-red-500">{error.message}</p>
        )}
        <button
          disabled={registering || disableButton}
          className={`${
            registering || disableButton ? 'bg-gray-100' : 'bg-blue-700'
          } w-full  text-white rounded-lg py-3 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50`}
          onClick={register}
        >
          Start coding now
        </button>

        <div id="auth-section" className="">
          <p className="text-gray-300 text-center text-lg my-5">
            or continue with your social media profile
          </p>

          <SocialLogin />

          <div className="flex justify-center my-5">
            <p className="text-gray-300 text-center">Already a member?</p>
            <button
              className="text-blue-700 focus:outline-none px-2"
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
