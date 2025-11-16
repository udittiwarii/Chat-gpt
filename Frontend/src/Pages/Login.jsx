import { useState } from 'react'
import './../style/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';


const Login = () => {
  const [from, setfrom] = useState({ email: '', password: '' })
  const [submit, setsubmit] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useUser();



  const handleChange = (e) => {
    const { name, value } = e.target
    setfrom({ ...from, [name]: value })
  }

  const handlesubmit = (e) => {
    e.preventDefault()
    setsubmit(true)
    axios.post("https://chatgpt-qpm4.onrender.com/api/auth/login", {
      email: from.email, password: from.password
    }, {
      withCredentials: true
    }
    ).then((res) => {
      setUser(res.data.user);
      navigate('/')

    }).catch((err) => {
      console.error("Login error:", err);
    }).finally(() => {
      setsubmit(false)
    })
  }
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

          <form onSubmit={handlesubmit} className="form" autoComplete="on">
            <label className="form-group">
              <span className="label">Email</span>
              <input className="input" type="email" name="email" placeholder="you@example.com" required value={from.email} onChange={handleChange} />
            </label>

            <label className="form-group">
              <span className="label">Password</span>
              <input className="input" type="password" name="password" placeholder="Enter your password" required value={from.password} onChange={handleChange} />
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
