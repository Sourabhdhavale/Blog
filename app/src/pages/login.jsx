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
    if (email.length === 0) {
      toast.warning('enter email')
    } else if (password.length === 0) {
      toast.warning('enter password')
    } else {
      const result = await login(email, password)
      if (result['status'] === 'success') {
        const id = result['data'][0].id;

        sessionStorage.setItem('id', id);
        toast.success('Welcome to the application')
          navigate('/home');
      }
      else {
        toast.error('Invalid email or password')
      }
    }
  }
    return (
        <div>
            <h3 style={{textAlign:"center" ,margin:"20px"}}>Login</h3>
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
                                    type="text" className="form-control" /></div>
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