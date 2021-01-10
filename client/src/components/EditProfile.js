import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import axios from '../utils/axios'

const EditProfile = ({ fields, userDetails, setUserDetails }) => {
  let history = useHistory()

  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    ...userDetails,
    password: '',
  })
  const [error, setError] = React.useState({
    status: false,
    message: '',
  })
  const [disableButton, setDisableButton] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const [isUploadPhoto, setIsUploadPhoto] = React.useState({
    show: false,
    status: false,
  })

  React.useEffect(() => {
    handleValidation()
  }, [formData])

  const handleValidation = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    setDisableButton(false)

    Object.keys(formData).forEach((dataKey) => {
      if (dataKey === 'email') {
        if (!formData['email'] || !emailRegex.test(formData['email'])) {
          return setDisableButton(true)
        }
      }

      if (dataKey === 'password') {
        if (formData['password'] && formData['password'].length < 6) {
          return setDisableButton(true)
        }
      }

      if (dataKey === 'name') {
        if (!formData['name']) {
          return setDisableButton(true)
        }
      }

      if (dataKey === 'bio') {
        if (!formData['bio'] || formData['bio'].length < 3) {
          return setDisableButton(true)
        }
      }

      if (dataKey === 'phone') {
        if (!formData['phone'] || formData['phone'].length < 10) {
          return setDisableButton(true)
        }
      }
    })
  }

  const handleImageChange = (e) => {
    const files = e.target.files || e.dataTransfer.files
    if (!files.length) return setDisableButton(true)
    const file = files[0]
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setDisableButton(true)
      return setError({
        status: true,
        message: 'Only images with ext .jpg and .jpeg are accepted',
      })
    }
    if (file.size > 500000) {
      setDisableButton(true)
      return setError({
        status: true,
        message: 'Image too large, select image below 500KB',
      })
    }

    if (!file) {
      setDisableButton(true)
      return setError({ status: true, message: 'Please select image' })
    }

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
    } else {
      newFormData.delete('photo')
      newFormData.append('image', formData.photo)
    }

    try {
      const res = await axios.post(`/profile`, newFormData)
      const newData = res.data

      if (typeof newData === 'object') {
        const photo = `data:image/${newData.photo.contentType};base64,${newData.photo.data_url}`
        newData.photo = photo
      }

      setUserDetails((data) => ({ ...data, ...newData }))
      setLoading(false)
      history.push('/profile')
    } catch (error) {
      setLoading(false)
      console.log(error.response.data.message)
      setError({
        status: true,
        message: error.response.data.message,
      })
    }
  }

  return (
    <div className="mt-5 md:mx-20 xl:mx-56">
      <div
        id="main"
        className="mx-5 my-10 lg:mx-20 pb-5 lg:pt-10 border border-gray-300 rounded-2xl"
      >
        <div className="flex w-full py-5 justify-between items-center px-4 lg:px-10">
          <div>
            <h1 className="text-2xl lg:text-4xl">Change Info</h1>
            <p className="text-gray-500 font-light">
              Changes will be reflected to every service
            </p>
          </div>
        </div>

        <div className="w-full max-w-lg">
          <form
            className="px-4 lg:px-10 pt-2 lg:pt-6"
            encType="multipart/form-data"
          >
            {fields.map((field, index) => {
              const lowercaseFieldName = field.name.toLowerCase()

              return (
                <div key={index} className="mb-2">
                  {lowercaseFieldName === 'photo' ? (
                    <>
                      <label className="block text-gray-700 text-sm font-semibold mb-1">
                        {field.name}
                      </label>
                      <div className="flex justify-between items-center border rounded w-full py-2 px-1 lg:px-3">
                        <img
                          className="w-20 lg:w-auto h-20 mr-2 rounded-lg"
                          src={formData['photo']}
                          alt="profile-picture"
                        />
                        {!isUploadPhoto.show && (
                          <div className="flex w-full items-center">
                            <button
                              className={`bg-blue-500 px-4 py-2 mr-1 text-white text-xs lg:text-sm rounded-xl focus:outline-none`}
                              onClick={() =>
                                setIsUploadPhoto({
                                  show: true,
                                  status: true,
                                })
                              }
                            >
                              Upload Photo
                            </button>
                            <button
                              className={`bg-green-500 px-4 py-2 text-white text-xs lg:text-sm rounded-xl focus:outline-none`}
                              onClick={() =>
                                setIsUploadPhoto({
                                  show: true,
                                  status: false,
                                })
                              }
                            >
                              Enter URL
                            </button>
                          </div>
                        )}
                        {isUploadPhoto.show && isUploadPhoto.status && (
                          <input
                            className="appearance-none focus:outline-none b"
                            type="file"
                            name="image"
                            accept="['image/jpg', 'image/jpeg', 'image/png']"
                            onChange={handleImageChange}
                          />
                        )}
                        {isUploadPhoto.show && !isUploadPhoto.status && (
                          <div className="flex flex-wrap w-full">
                            <label className="w-full block text-gray-700 text-sm font-semibold mb-1">
                              Enter URL
                            </label>
                            <input
                              className="appearance-none w-full text-gray-700 shadow rounded border py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                              type="text"
                              onChange={(e) =>
                                setFormData((data) => ({
                                  ...data,
                                  [lowercaseFieldName]: e.target.value,
                                }))
                              }
                            />
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <label className="block text-gray-700 text-sm font-semibold mb-1">
                        {field.name}
                      </label>
                      <div
                        key={field.name}
                        className="flex items-center shadow rounded border py-2 px-3"
                      >
                        <input
                          className="appearance-none w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type={
                            lowercaseFieldName === 'password' && !showPassword
                              ? 'password'
                              : 'text'
                          }
                          value={formData[lowercaseFieldName]}
                          placeholder={
                            lowercaseFieldName === 'password'
                              ? 'Enter your new password or leave blank'
                              : field.name
                          }
                          onChange={(e) =>
                            setFormData((data) => ({
                              ...data,
                              [lowercaseFieldName]: e.target.value,
                            }))
                          }
                        />
                        {lowercaseFieldName === 'password' && (
                          <ion-icon
                            className="cursor-pointer"
                            size="medium"
                            name={
                              showPassword ? 'eye-off-outline' : 'eye-outline'
                            }
                            onClick={() => setShowPassword((show) => !show)}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </form>
          {error.status && (
            <p className="text-red-500 text-center">{error.message}</p>
          )}
        </div>

        <button
          disabled={loading || disableButton}
          className={`lg:px-10 px-4 py-2 text-white my-1 lg:my-5 ml-5 lg:ml-10 rounded-xl focus:outline-none ${
            loading || disableButton ? 'bg-gray-500' : 'bg-blue-500'
          }`}
          onClick={onSubmit}
        >
          Save
        </button>
        <Link to="/profile">
          <button
            disabled={loading}
            className={`lg:px-10 px-4 py-2 text-white my-1 lg:my-5 ml-5 lg:ml-10 rounded-xl focus:outline-none ${
              loading ? 'bg-gray-500' : 'bg-red-500'
            }`}
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  )
}

export default EditProfile
