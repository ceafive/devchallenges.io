import React from 'react'
import Dropdown from './Dropdown'

const Navbar = ({ userDetails }) => {
  const [showDropDown, setShowDropDown] = React.useState(false)
  return (
    <div className="w-full flex justify-between items-center py-3 px-40">
      <div>
        <h1>My Authentication App</h1>
      </div>

      <div className="relative">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowDropDown((show) => !show)}
        >
          <img
            className="h-10 mr-2 rounded-lg"
            src={userDetails['photo']}
            alt="profile-picture"
          />
          <p className="mr-4">{userDetails['name']}</p>
          <ion-icon name="caret-down-outline"></ion-icon>
        </div>
        {showDropDown && <Dropdown setShowDropDown={setShowDropDown} />}
      </div>
    </div>
  )
}

export default Navbar
