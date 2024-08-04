import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../services/user'
import { toast } from 'react-toastify';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const onCancel = () => {
        navigate('/login');
    }
   
    const onRegister = async () => {
        if (email.length === 0) {
            toast.error('enter email');
        }
        else if (password.length === 0) {
            toast.error('enter password');
        }
        else if (name.length === 0) {
            toast.error('enter name');

        }
        else if (phone.length === 0) {
            toast.error('enter phone no.');
        }
        else {
            const result = await register(name, email, password, phone);
          if (result['status'] === 'success') {
              toast.success('Successfully registered.');
              navigate('/login');
          } else {
            toast.error('Failed to register.')
          }
        }
    }
    
    return (
        <div>
             <h3 style={{textAlign:"center" ,margin:"20px"}}>Register</h3>
            <div className="container">
                <div className="row">
                    <div className="col-3"></div>
                    <div className="col">
                        <div className="form">
                        <div className="row mb-3">
                                <div className="col-2"><label htmlFor="">Email</label></div>
                                <div className="col"><input
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                      }}
                                    type="text" className="form-control" /></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-2"><label htmlFor="">Password</label></div>
                                <div className="col"><input
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    type="text" className="form-control" /></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-2"><label htmlFor="">Full Name</label></div>
                                <div className="col"><input
                            onChange={(e) => {
                                setName(e.target.value)
                                    }}
                                    type="email" className="form-control" /></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-2"><label htmlFor="">Phone No.</label></div>
                                <div className="col"><input
                                    onChange={(e) => {
                                        setPhone(e.target.value)
                                    }}
                                    type="text" className="form-control" /></div>
                            </div>
                            <button className="btn btn-primary me-3" onClick={onRegister}>Sign Up</button>
                            <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
                    </div>
                    </div>
                    <div className="col-3"></div>
                </div>
            </div>
       </div>
    )
}

export default Register;