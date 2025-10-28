import '../styles/pages.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: '', firstname: '', lastname: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const res = await axios.post(
      'http://localhost:3000/api/auth/register',
      {
        email: form.email,
        fullname: {
          firstname: form.firstname,
          lastname: form.lastname
        },
        password: form.password
      },
      { withCredentials: true }
    ).then((res) => {

      console.log("✅ Registered successfully:", res.data);
      navigate('/'); // redirect to login page after registration
    }).catch((err)=> {
      console.error("❌ Error during registration:", err.response?.data || err.message);
    })
  };

  return (
    <div className="auth-page">
      <div className="card card--narrow">
        <div style={{ flex: 1 }}>
          <div className="header">
            <div>
              <h2>Create account</h2>
              <p className="helper">Sign up to continue — this is a placeholder form.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="form" autoComplete="on">
            <div className="form-row">
              <label className="form-group">
                <span className="label">Email</span>
                <input
                  className="input"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </label>
            </div>

            <div className="form-row" style={{ gridTemplateColumns: '1fr 1fr', display: 'grid' }}>
              <label className="form-group">
                <span className="label">First name</span>
                <input
                  className="input"
                  name="firstname"
                  type="text"
                  placeholder="First name"
                  value={form.firstname}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                />
              </label>

              <label className="form-group">
                <span className="label">Last name</span>
                <input
                  className="input"
                  name="lastname"
                  type="text"
                  placeholder="Last name"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                />
              </label>
            </div>

            <label className="form-group">
              <span className="label">Password</span>
              <input
                className="input"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
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
  );
};

export default Register;
