import React,{useState,Fragment} from 'react'
import {Link,withRouter} from "react-router-dom"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {createProfile} from '../../actions/profile'


const CreateProfile = ({ createProfile, history}) => {
    const [formData, setFormData] =useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        githubusername:'',
        bio:'',
        twitter:'',
        facebook:'',
        linkedin:'',
        youtube:'',
        instagram:'' 
    });

    const [displaySocialInputs, toggleSocialInputs]=useState(false);

    const{
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    }=formData;

    const onChange=e=>setFormData({
        ...formData,
        [e.target.name]:e.target.value
    });

    const onSubmit=e=>{
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <div className="container">
           <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required fields</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e=>onChange(e)}>
            <option value="0">* What kind of athlete are you?</option>
            <option value="Bodybuidler">Bodybuidler</option>
            <option value="Strongman">Strongman</option>
            <option value="Crossfit">Crossfit</option>
            <option value="Powerlifter">Powerlifter</option>
            <option value="Endurance">Endurance</option>
            <option value="Owner">Owner</option>
            <option value="Coach">Coach</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >What best describes you</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Facility Name" name="company" value={company} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >Where do you do your activities</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            Marathon Running, SBD, Coaching)</small
          >
        </div>
        {/* <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={e=>onChange(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div> */}
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" onClick={()=> toggleSocialInputs(!displaySocialInputs)} className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span><br></br>
          <span>Optional <br></br><small className="form-text">*Must use https://www.WEBSITE.com/YOURNAME format*</small></span>
        </div>

        {displaySocialInputs && <Fragment>
            <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e=>onChange(e)}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e=>onChange(e)}/>
        </div>

        {/* <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e=>onChange(e)}/>
        </div> */}

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e=>onChange(e)}/>
        </div>
        </Fragment>}

        
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form> 
      </div>
    )
};

CreateProfile.propTypes = {
    createProfile:PropTypes.func.isRequired
};


export default connect(null,{createProfile})(withRouter(CreateProfile));
