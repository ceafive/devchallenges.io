import React from 'react'
import { Link } from 'react-router-dom'

import axios from '../utils/axios'

const ProfileDetails = ({ fields, userDetails, setUserDetails }) => {
  const userAuth = JSON.parse(localStorage.getItem('dev-auth-app'))
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState({
    status: false,
    message: '',
  })

  const fetchUserDetails = async () => {
    if (!userAuth) return history.replace('/')

    const id = userAuth.auth && userAuth.user.id
    if (!id) return

    try {
      const res = await axios.get(`/profile/${id}`)
      const newData = res.data

      if (typeof newData.photo === 'object') {
        const photo = `data:image/${newData.photo.contentType};base64,${newData.photo.data_url}`
        newData.photo = photo
      }

      delete newData.password
      setUserDetails((data) => ({
        ...data,
        ...newData,
        password: '**********',
      }))
    } catch (error) {
      console.log(error.response.data.message)
      setError({
        status: true,
        message: error.response.data.message,
      })
    }
  }

  React.useEffect(() => {
    fetchUserDetails()
  }, [])

  if (!userAuth) return null

  return (
    <div className="mt-5 md:mx-48 lg:mx-56">
      <div className="text-center">
        <h1 className="text-4xl">Personal Info</h1>
        <p className="text-gray-500 font-light">
          Basic info like your name and photo
        </p>
      </div>
      <div
        id="main"
        className="my-5 m-20 pt-10 border border-gray-300 rounded-2xl"
      >
        <div className="border-b border-gray-300">
          <div className="flex w-full py-5 justify-between items-center px-10">
            <div>
              <h1 className="text-4xl">Profile</h1>
              <p className="text-gray-500 font-light">
                Some info may be visible to other people
              </p>
            </div>
            <Link to="/profile/edit-profile">
              <button className="text-gray-400 border border-gray-400 px-12 py-2 rounded-xl focus:outline-none">
                Edit
              </button>
            </Link>
          </div>
        </div>

        {fields.map((field, index) => {
          return (
            <div
              key={index}
              className={`${
                index !== fields.length - 1 && 'border-b border-gray-300'
              }`}
            >
              <div className="flex w-full py-5 items-center px-10">
                <div className="w-5/12">
                  <h1 className="text-gray-300 uppercase">{field.name}</h1>
                </div>
                {field.name.toLowerCase() === 'photo' ? (
                  <img
                    className=" h-20 mr-2 rounded-lg"
                    src={userDetails['photo']}
                    alt="profile-picture"
                  />
                ) : (
                  <h1 className="">{userDetails[field.name.toLowerCase()]}</h1>
                )}
              </div>
            </div>
          )
        })}
      </div>
      {error.status && (
        <p className="text-red-500 text-center">{error.message}</p>
      )}
    </div>
  )
}

export default ProfileDetails
