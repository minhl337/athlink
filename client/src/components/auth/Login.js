import React,{Fragment,useState} from 'react';
import axios from "axios";
import {Link,Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/auth';

const Login = ({login,isAuthenticated}) => {
    const [formData,setFormData]=useState({
        email:'',
        password:""
    });

    const {email,password} = formData;

    const onChange=e=>setFormData({...formData, [e.target.name]:e.target.value});

    const onSubmit=async e=>{
        e.preventDefault();
        login(email,password);
        }
    
        //redirect if logged in
    if(isAuthenticated){
        return <Redirect to='/dashboard'/>
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

Login.propTypes={
    login:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);

