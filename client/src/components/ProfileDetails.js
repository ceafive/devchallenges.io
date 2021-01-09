import React from 'react'
import { Link } from 'react-router-dom'

import axios from '../utils/axios'

const ProfileDetails = ({ fields, initialDetails,userDetails,setUserDetails }) => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState({
    status: false,
    message: '',
  })

  const fetchUserDetails = async () => {
    const userDetails = JSON.parse(localStorage.getItem('dev-auth-app'))
    if (!userDetails) return

    const id = userDetails.auth && userDetails.user.id
    if (!id) return

    try {
      const res = await axios.get(`/profile/${id}`)
      const newData = res.data

      const photo = `data:image/${newData.photo.contentType};base64,${newData.photo.data_url}`
      newData.photo = photo

      setUserDetails((data) => ({ ...data, ...newData }))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
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
  )
}

export default ProfileDetails
