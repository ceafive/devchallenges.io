import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { authService, retrieveFromLocalStorage, sleep } from "./utils"

import Main from "./components/Main/Main.component"
import LoginRegister from "./components/LoginRegister/LoginRegister.component"

const App = () => {
  const [userData, setUserData] = React.useState(() =>
    retrieveFromLocalStorage("uploaderCreds")
  )

  const [isLoggedIn, setIsLoggedIn] = React.useState(
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
      setIsLoggedIn(data ? data.auth : false)
    })
    return () => subscription.unsubscribe()
  }, [userData])

  return (
    <div className="relative font-body h-screen">
      <Router>
        <Switch>
          <Route key={1} path="/gallery">
            <Main userData={userData} isLoggedIn={isLoggedIn} />
          </Route>
          <Route key={2} exact path="/">
            <LoginRegister isLoggedIn={isLoggedIn} />
          </Route>
          <Route key={3}>
            <Main userData={userData} isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
