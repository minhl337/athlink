import React from 'react'
import {Link} from 'react-router-dom'

const DashboardActions = () => {
    return (
        <div>
        <div className="dash-buttons">
        <Link to="/edit-profile" className="btn">
          <i className="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn">
          <i className="fab fa-black-tie text-primary"></i> Add Qualifications
        </Link>
        <Link to="/add-education" className="btn">
          <i className="fas fa-trophy text-primary"></i> Add Results
        </Link>
      </div>
        </div>
    )
}

export default DashboardActions
