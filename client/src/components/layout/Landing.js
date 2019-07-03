import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Athlink</h1>
                <p className="lead">
                Create your athelete profile, share results and get input from
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
}

export default Landing
