import React from 'react'
import Dropdown from './Dropdown'

const Navbar = () => {
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
            className="w-10 h-10 mr-2"
            src="https://images.unsplash.com/photo-1507965613665-5fbb4cbb8399?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="profile-picture"
          />
          <p className="mr-4">Castro Agbo</p>
          <ion-icon name="caret-down-outline"></ion-icon>
        </div>
        {showDropDown && <Dropdown />}
      </div>
    </div>
  )
}

export default Navbar
