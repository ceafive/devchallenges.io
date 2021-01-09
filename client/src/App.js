import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Navbar from './components/Navbar'
import ProfileDetails from './components/ProfileDetails'
import EditProfile from './components/EditProfile'
import Authenticate from './components/Authenticate'

const fields = [
  { name: 'Photo' },
  { name: 'Name' },
  { name: 'Bio' },
  { name: 'Phone' },
  { name: 'Email' },
  { name: 'Password' },
]

const initialDetails = {
  photo: '',
  name: '',
  bio: '',
  phone: '',
  email: '',
  password: '**********',
}

const App = () => {
  const [userDetails, setUserDetails] = React.useState(initialDetails)

  const match = useRouteMatch()

  const routeUrl = match.url

  console.log(match)

  return (
    <div className="font-body">
      <Switch>
        <Route path="/profile">
          <Navbar userDetails={userDetails} />
          <Switch>
            <Route path="/profile/edit-profile">
              <div className="mt-5 mx-56">
                <EditProfile
                  fields={fields}
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              </div>
            </Route>
            <Route path="/profile">
              <div className="mt-5 mx-56">
                <div className="text-center">
                  <h1 className="text-4xl">Personal Info</h1>
                  <p className="text-gray-500 font-light">
                    Basic info like your name and photo
                  </p>
                </div>
                <ProfileDetails
                  initialDetails={initialDetails}
                  fields={fields}
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                />
              </div>
            </Route>
          </Switch>
        </Route>
        <Route path="/">
          <Authenticate />
        </Route>
      </Switch>
    </div>
  )
}

export default App
