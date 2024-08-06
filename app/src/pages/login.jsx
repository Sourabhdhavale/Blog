import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/user';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate()

  const onSignUp = () => {
    navigate('/register');
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (email.length === 0 || email.trim() === '') {
      toast.warning('Enter email')
      return;
    } else if (password.length === 0 || password.trim() === '') {
      toast.warning('Enter password')
      return;
    }
    else {
      try {
        const result = await login(email, password)
        if (result['status'] === 'success') {
          // read the token
          console.log("OnLogin: " + JSON.stringify(result.data, 2));

          const { token, id, name } = result['data']

          sessionStorage.setItem('token', token)
          sessionStorage.setItem('id', id);
          sessionStorage.setItem('name', name)

          toast.success(`Welcome to the application,${name}`)
          navigate('/home')
        }
        else {
          toast.error('Invalid email or password')
        }
      }
      catch (error) {
        toast.error('An error occurred while logging in.');
      }
    }
  }
  return (
    <div>
      <h3 style={{ textAlign: "center", margin: "20px" }}>Login</h3>
      <div className="container">
        <div className="row">
          <div className="col-3"></div>
          <div className="col">
            <div className="form">
              <div className="row mb-3">
                <div className="col-2"><label htmlFor="">Email</label></div>
                <div className="col"><input onChange={(e) => {
                  setEmail(e.target.value)
                }}
                  type="email" className="form-control" /></div>
              </div>
              <div className="row mb-3">
                <div className="col-2"><label htmlFor="">Password</label></div>
                <div className="col"><input onChange={(e) => {
                  setPassword(e.target.value)
                }}
                  type="password" className="form-control" /></div>
              </div>
              <button className="btn btn-primary me-3" onClick={onLogin}>Sign In</button>
              <button className="btn btn-danger" onClick={onSignUp}>Sign Up</button>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  )
}

export default Login;