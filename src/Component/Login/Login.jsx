import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import logo from '../Assests/book.png';
import email_icon from '../Assests/email.png';
import lock_icon from '../Assests/padlock.png';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

 
  const validUsers = [
    { email: '22bee037@nith.ac.in', password: '22bee037' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

   
    if (!email || !password) {
      alert('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    
    const user = validUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
     
      localStorage.setItem('token', 'your_token');  // Store token in localStorage
      navigate('/inventory');  // Redirect to the inventory page
    } else {
      // Invalid credentials
      alert('Invalid email or password');
    }
  };

  return (
    <div className="box">
      <div className="header">
        <img src={logo} alt="logo" />
        <div className="text">Login</div> 
      </div>
      <form onSubmit={handleLogin}>
        <div className="form">
          <div className="input">
            <img src={email_icon} alt="Email Icon" />
            <input 
              type="email" 
              placeholder="Email id" 
              aria-label="Email id"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input">
            <img src={lock_icon} alt="Lock Icon" />
            <input 
              type="password" 
              placeholder="Password" 
              aria-label="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="submit-container">
          <button type="submit" className="submit">
            Login
          </button>
        </div>
      </form>

      <div className="login">
        <p>Don't have an Account?</p>
        <button className="btn signup">
          <Link to="/" className='link'>
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
