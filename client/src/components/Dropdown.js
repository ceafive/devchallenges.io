import React from 'react'

const fields = [
  { name: 'My Profile', icon: 'person-circle-outline' },
  { name: 'Group Chat', icon: 'people-outline' },
  { name: 'Logout', icon: 'exit-outline' },
]

const Dropdown = () => {
  const [selected, setSelected] = React.useState('')
  return (
    <div className="absolute border shadow-lg rounded-lg bg-white w-64 h-48 mt-5">
      {fields.map((field, index) => {
        return (
          <div
            key={index}
            className={`${
              field.name === 'Logout'
                ? 'text-red-700 border-t border-gray-300'
                : 'text-gray-700'
            } ${
              selected === index && 'bg-gray-100 rounded-xl'
            } flex items-center font-medium my-3 mx-4 px-3 py-1 cursor-pointer`}
            onClick={() => setSelected(index)}
          >
            <div className="mr-1">
              <ion-icon size="large" name={field.icon}></ion-icon>
            </div>
            <div>{field.name}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Dropdown
