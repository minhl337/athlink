import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({education:{
    school,
    degree,
    fieldofstudy,
    current,
    to,
    from,
    description
}}) => {
    return (
        <div>
            <h3 className='text-dark'>{school}</h3>
            <p>
                <Moment format='MM/DD/YYYY'>{from}</Moment>{!to ? '' : <Moment format=' - MM/DD/YYYY'>{to}</Moment>}
            </p>
            <p>
                <strong>Result: </strong>{degree}
            </p>
            <p>
                <strong>Event Type: </strong>{fieldofstudy}
            </p>
            <p>
                <strong>Description: </strong>{description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default ProfileEducation
