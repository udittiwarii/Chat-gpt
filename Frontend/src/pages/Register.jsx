import React from 'react'
import '../styles/pages.css'

const Register = () => {
  return (
    <div className="auth-page">
      <div className="card card--narrow">
        <div style={{flex:1}}>
          <div className="header">
            <div>
              <h2>Create account</h2>
              <p className="helper">Sign up to continue — this is a placeholder form.</p>
            </div>
          </div>

          <form onSubmit={(e)=>e.preventDefault()} className="form" autoComplete="on">
            <div className="form-row">
              <label className="form-group">
                <span className="label">Email</span>
                <input className="input" name="email" type="email" placeholder="you@example.com" required />
              </label>
            </div>

            <div className="form-row" style={{gridTemplateColumns:'1fr 1fr', display:'grid'}}>
              <label className="form-group">
                <span className="label">First name</span>
                <input className="input" name="firstName" type="text" placeholder="First name" required />
              </label>

              <label className="form-group">
                <span className="label">Last name</span>
                <input className="input" name="lastName" type="text" placeholder="Last name" required />
              </label>
            </div>

            <label className="form-group">
              <span className="label">Password</span>
              <input className="input" name="password" type="password" placeholder="Create a password" required />
            </label>

            <div className="actions">
              <button type="submit" className="btn">Create account</button>
              <button type="button" className="secondary">Use Google</button>
            </div>

            <div className="links">
              <a href="/login">Already have an account? Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
