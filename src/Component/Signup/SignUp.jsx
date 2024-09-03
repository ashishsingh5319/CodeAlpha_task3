import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css'; 
import logo from '../Assests/book.png';
import user_icon from '../Assests/user.png';
import email_icon from '../Assests/email.png';
import lock_icon from '../Assests/padlock.png';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      alert('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Retrieve existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email already exists
    const userExists = storedUsers.some((user) => user.email === email);

    if (userExists) {
      setError('You already have an account. Please log in.');
    } else {
      // Add new user to localStorage
      const newUser = { name, email, password };
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      // Show success alert and redirect to login page
      alert('Sign-up successful!');
      navigate('/login');
    }
  };

  return (
    <div className="container-1">
      <div className="header">
        <img src={logo} alt="RoboSoc Logo" />
        <div className="text">Sign Up</div> 
      </div>
      <form onSubmit={handleSignUp}>
        <div className="form">
          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input 
              type="text" 
              placeholder="Name" 
              aria-label="Name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="Email Icon" />
            <input 
              type="email" 
              placeholder="Email id" 
              aria-label="Email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="input">
            <img src={lock_icon} alt="Password Icon" />
            <input 
              type="password" 
              placeholder="Password" 
              aria-label="Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="submit-container">
          <button type="submit" className="submit">
            Sign Up
          </button>
        </div>
      </form>

      <div className="login">
        <p>Already have an account?</p>
        <button className="btn signup">
          <Link to="/login" className='link'>
            Login
          </Link>
        </button>
      </div>
    </div>
  );
};

export default SignUp;
