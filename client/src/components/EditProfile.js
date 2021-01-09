import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from '../utils/axios'

const EditProfile = ({ fields, userDetails, setUserDetails }) => {
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState(userDetails)
  const [error, setError] = React.useState({
    status: false,
    message: '',
  })

  let history = useHistory()

  const handleImageChange = (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) return
    const file = files[0]
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      return setError({
        status: true,
        message: 'Only images with ext .jpg and .jpeg are accepted',
      })
    }
    if (file.size > 5000000) {
      return setError({
        status: true,
        message: 'Image too large, select image below 500KB',
      })
    }

    if (!file) return setError({ status: true, message: 'Please select image' })

    setError({
      status: false,
      message: '',
    })

    setFormData((data) => ({ ...data, photo: file }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const newFormData = new FormData()
    newFormData.append('id', userDetails._id)
    newFormData.append('name', formData.name)
    newFormData.append('bio', formData.bio)
    newFormData.append('phone', formData.phone)
    newFormData.append('email', formData.email)
    newFormData.append('password', formData.password)

    if (typeof formData.photo !== 'string') {
      newFormData.append('photo', formData.photo)
    }

    try {
      const res = await axios.post(`/profile`, newFormData)
      const newData = res.data

      const photo = `data:image/${newData.photo.contentType};base64,${newData.photo.data_url}`
      newData.photo = photo

      setUserDetails((data) => ({ ...data, ...newData }))
      setLoading(false)
      history.push('/profile')
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    setFormData((data) => ({ ...data, ...userDetails }))
  }, [userDetails])

  return (
    <div
      id="main"
      className="mt-5 m-20 pt-10 border border-gray-300 rounded-2xl"
    >
      <div className="">
        <div className="flex w-full justify-between items-center px-10">
          <div>
            <h1 className="text-4xl">Change Info</h1>
            <p className="text-gray-500 font-light">
              Changes will be reflected to every service
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        {error.status && (
          <p className="text-red-500 text-center">{error.message}</p>
        )}
        <form className="px-10 pt-6" encType="multipart/form-data">
          {fields.map((field, index) => {
            const lowercaseFieldName = field.name.toLowerCase()

            return (
              <div key={index} className="mb-2">
                {field.name.toLowerCase() === 'photo' ? (
                  <>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      {field.name}
                    </label>
                    <div className="flex justify-between items-center border rounded w-full py-2 px-3">
                      <img
                        className="h-20 mr-2 rounded-lg"
                        src={formData['photo']}
                        alt="profile-picture"
                      />
                      <input
                        className="appearance-none focus:outline-none"
                        type="file"
                        name="image"
                        accept="['image/jpg', 'image/jpeg', 'image/png']"
                        onChange={handleImageChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">
                      {field.name}
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type={
                        lowercaseFieldName === 'password' ? 'password' : 'text'
                      }
                      value={formData[lowercaseFieldName]}
                      placeholder={field.name}
                      onChange={(e) =>
                        setFormData((data) => ({
                          ...data,
                          [lowercaseFieldName]: e.target.value,
                        }))
                      }
                    />
                  </>
                )}
              </div>
            )
          })}
        </form>
      </div>

      <button
        disabled={loading}
        className={`px-10 py-2 text-white my-5 ml-10 rounded-xl focus:outline-none ${
          loading ? 'bg-gray-500' : 'bg-blue-500'
        }`}
        onClick={onSubmit}
      >
        Save
      </button>
      <Link to="/profile">
        <button
          disabled={loading}
          className={`px-10 py-2 text-white my-5 ml-10 rounded-xl focus:outline-none ${
            loading ? 'bg-gray-500' : 'bg-red-500'
          }`}
        >
          Cancel
        </button>
      </Link>
    </div>
  )
}

export default EditProfile
