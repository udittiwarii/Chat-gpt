import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/pages.css'

const Home = () => {
  return (
    <div className="auth-page">
      <div className="card">
        <div>
          <div className="header">
            <div>
              <h1>Welcome</h1>
              <p className="helper">This is a placeholder home page styled to match the auth layout.</p>
            </div>
            <div>
              <Link to="/login" className="btn">Login</Link>
            </div>
          </div>

          <p style={{marginTop:12}}>Use the buttons to navigate to the login or register pages.</p>

          <div className="links" style={{marginTop:18}}>
            <Link to="/register">Create an account</Link>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
