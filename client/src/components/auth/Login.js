import React,{Fragment,useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom"

const Login = () => {
    const [formData,setFormData]=useState({
        email:'',
        password:""
    });

    const {email,password} = formData;

    const onChange=e=>setFormData({...formData, [e.target.name]:e.target.value});

    const onSubmit=async e=>{
        e.preventDefault();
        console.log("Login Success")
        }
    

    return (
        <section className="container">
            <h1 className="large text-primary">
                Log In
            </h1>
            <p className="lead"><i className="fas fa-dumbbell"></i> Log into your account</p>
            <form onSubmit={e=>onSubmit(e)} className="form">
                <div className="form-group">
                <input 
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e=>onChange(e)}
                    required />
                </div>
                <div className="form-group">
                <input 
                    type="password" 
                    placeholder="Password" 
                    minlength="6"
                    name="password"
                    value={password}
                    onChange={e=>onChange(e)}
                    required />
                </div>
                <input type="submit" value="Log In" className="btn btn-primary" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
            </section>
    )
}

export default Login

