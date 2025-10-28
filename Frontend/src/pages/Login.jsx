import React from 'react'
import '../styles/pages.css'

const Login = () => {
  return (
    <div className="auth-page">
      <div className="card card--narrow">
        <div style={{ flex: 1 }}>
          <div className="header">
            <div>
              <h2>Welcome back</h2>
              <p className="helper">Sign in to your account — placeholder form.</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="form" autoComplete="on">
            <label className="form-group">
              <span className="label">Email</span>
              <input className="input" type="email" name="email" placeholder="you@example.com" required />
            </label>

            <label className="form-group">
              <span className="label">Password</span>
              <input className="input" type="password" name="password" placeholder="Enter your password" required />
            </label>

            <div className="actions">
              <button type="submit" className="btn">Login</button>
              <button type="button" className="secondary">Forgot?</button>
            </div>

            <div className="links">
              <a href="/register">Create an account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
