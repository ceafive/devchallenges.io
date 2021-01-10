import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import ProfileDetails from './components/ProfileDetails'
import EditProfile from './components/EditProfile'
import Authenticate from './components/Authenticate'
import Footer from './components/Footer'

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

  return (
    <div className="font-body min-h-screen">
      <Switch>
        <Route path="/profile">
          <Navbar userDetails={userDetails} />
          <Switch>
            <Route path="/profile/edit-profile">
              <EditProfile
                fields={fields}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
              <Footer />
            </Route>
            <Route path="/profile">
              <ProfileDetails
                fields={fields}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
              />
              <Footer />
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
