import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { authService, retrieveFromLocalStorage, sleep } from "./utils"

import Main from "./components/Main/Main.component"
import LoginRegister from "./components/LoginRegister/LoginRegister.component"

const App = () => {
  const [userData, setUserData] = React.useState(() =>
    retrieveFromLocalStorage("uploaderCreds")
  )

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  React.useEffect(() => {
    authService.setUser(userData)

    // listen to data changes
    const subscription = authService.getUser().subscribe(async (data) => {
      if (data) {
        await sleep(1000)
        setUserData(data)
        setIsLoggedIn(true)
      }
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
            <LoginRegister isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
