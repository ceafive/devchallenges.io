import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import { authService, retrieveFromLocalStorage, sleep } from "./utils"

import Main from "./components/Main/Main.component"
import LoginRegister from "./components/LoginRegister/LoginRegister.component"

const App = () => {
  const [userData, setUserData] = React.useState(() =>
    retrieveFromLocalStorage("uploaderCreds")
  )
  const [userLoggedIn, setUserLoggedIn] = React.useState(
    userData ? userData.auth : false
  )

  React.useEffect(() => {
    authService.setUser(userData)

    // listen to data changes
    const subscription = authService.getUser().subscribe(async (data) => {
      if (data) {
        await sleep(1000)
        setUserData(data)
      }
      setUserLoggedIn(data ? data.auth : false)
    })
    return () => subscription.unsubscribe()
  }, [userData])

  return (
    <div className="font-body h-screen">
      <Router>
        <Switch>
          <Route path="/gallery">
            <Main userData={userData} />
          </Route>
          <Route exact path="/">
            <LoginRegister />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
