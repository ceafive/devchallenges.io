import React from 'react'
import Login from './Login'
import Register from './Register'
import Footer from './Footer'

const Authenticate = () => {
  const [isLogin, setIsLogin] = React.useState(true)

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gradient1">
      {isLogin && <Login setIsLogin={setIsLogin} />}
      {!isLogin && <Register setIsLogin={setIsLogin} />}
      <Footer />
    </div>
  )
}

export default Authenticate
