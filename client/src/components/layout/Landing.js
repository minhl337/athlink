import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to='./dashboard'/>
    }

    return (
        <section className="landing">
            <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Athlink</h1>
                <p className="lead">
                Create your athlete profile, share results and get input from
                other top athletes
                </p>
                <div className="buttons">
                <Link to ="/register" className="btn btn-primary">Register</Link>
                <Link to ="/login" className="btn btn">Login</Link>
                </div>
            </div>
            </div>
        </section>
    )
};

Landing.prototype={
    isAuthenticated:PropTypes.bool
}

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
