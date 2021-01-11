import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import Authenticate from './components/Authenticate'

const Navbar = lazy(() => import('./components/Navbar'))
const ProfileDetails = lazy(() => import('./components/ProfileDetails'))
const EditProfile = lazy(() => import('./components/EditProfile'))
const Footer = lazy(() => import('./components/Footer'))

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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  )
}

export default App
