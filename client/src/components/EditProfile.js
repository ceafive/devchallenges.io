import React from 'react'

const ProfileDetails = ({ fields, setIsEdit }) => {
  return (
    <div
      id="main"
      className="mt-10 m-20 pt-10 border border-gray-300 rounded-2xl"
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
        <form className="px-10 pt-6">
          {fields.map((field, index) => {
            return (
              <div key={index} className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-1"
                  htmlFor={field.name}
                >
                  {field.name}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={field.name}
                  type="text"
                  placeholder={field.name}
                />
              </div>
            )
          })}
        </form>
      </div>

      <button
        className="bg-blue-500 px-10 py-2 text-white my-5 ml-10 rounded-lg"
        onClick={() => {
          setIsEdit((edit) => !edit)
        }}
      >
        Save
      </button>
    </div>
  )
}

export default ProfileDetails
