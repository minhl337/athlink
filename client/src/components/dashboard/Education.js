import React,{Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {deleteEducation} from '../../actions/profile'


const Education = ({education,deleteEducation}) => {
    const educations = education.map(edu=>(
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format='MM/DD/YYYY'>{edu.from}</Moment> - {
                    edu.to === null ? ('') : (<Moment format='MM/DD/YYYY'>{edu.to}</Moment>)
                }
            </td>
            <td>
                <button onClick={()=>deleteEducation(edu._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));

    return (
        <div>
            <h2 className="my-2">Event Results</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th className="hide-sm">Result</th>
                        <th className="hide-sm">Year(s)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    education:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired
}

export default connect(null,{deleteEducation})(Education)
