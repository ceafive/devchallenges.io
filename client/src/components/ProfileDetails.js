import React from 'react'

const ProfileDetails = ({ fields, setIsEdit }) => {
  return (
    <div
      id="main"
      className="mt-10 m-20 pt-10 border border-gray-300 rounded-2xl"
    >
      <div className="border-b border-gray-300">
        <div className="flex w-full py-5 justify-between items-center px-10">
          <div>
            <h1 className="text-4xl">Profile</h1>
            <p className="text-gray-500 font-light">
              Some info may be visible to other people
            </p>
          </div>

          <button
            className="text-gray-400 border border-gray-400 px-12 py-2 rounded-xl focus:outline-none"
            onClick={() => {
              setIsEdit((edit) => !edit)
            }}
          >
            Edit
          </button>
        </div>
      </div>

      {fields.map((field, index) => {
        return (
          <div
            className={`${
              index !== fields.length - 1 && 'border-b border-gray-300'
            }`}
          >
            <div className="flex w-full py-5 items-center px-10">
              <div className="w-5/12">
                <h1 className="text-gray-300 uppercase">{field.name}</h1>
              </div>

              <div className="">hello</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProfileDetails
