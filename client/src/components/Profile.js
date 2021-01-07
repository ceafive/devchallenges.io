import React from 'react'
import Navbar from './Navbar'
import ProfileDetails from './ProfileDetails'
import EditProfile from './EditProfile'

const fields = [
  { name: 'Photo' },
  { name: 'Name' },
  { name: 'Bio' },
  { name: 'Phone' },
  { name: 'Email' },
  { name: 'Password' },
]

const Profile = () => {
  const [isEdit, setIsEdit] = React.useState(true)

  const [formData, setFormData] = React.useState()
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mt-5 mx-56">
        <div className="text-center">
          <h1 className="text-4xl">Personal Info</h1>
          <p className="text-gray-500 font-light">
            Basic info like your name and photo
          </p>
        </div>

        {!isEdit && <ProfileDetails setIsEdit={setIsEdit} fields={fields} />}
        {isEdit && <EditProfile setIsEdit={setIsEdit} fields={fields} />}
      </div>
    </div>
  )
}

export default Profile
