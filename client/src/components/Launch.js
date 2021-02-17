import gql from 'graphql-tag'
import {useQuery} from '@apollo/client';
import {Link,useParams} from 'react-router-dom'
import classNames from 'classnames'
import React from 'react'

const LAUNCH_QUERY=gql`
    query LaunchQuery($flight_number:Int!){
        launch(flight_number:$flight_number){
            flight_number,
            mission_name,
            launch_date_local,
            launch_success,
            launch_year,
            rocket{
                rocket_id,
                rocket_name,
                rocket_type
            }
        }
    }`

const Launch=()=>{
    let {flight_number}=useParams()
    flight_number=parseInt(flight_number)
    const { loading, error, data }= useQuery(LAUNCH_QUERY,{
        variables:{flight_number:flight_number}
    })
    if(loading) return <h4>Loading.....</h4>
    if(error) console.log(error)
    // else console.log(data)
    const  {mission_name,launch_date_local,launch_year,launch_success,rocket:{rocket_id,rocket_name,rocket_type}}=data.launch

    return (
        <div>
            <h1 className="display-4 my-3"><span className="text-dark">Mission: </span>
            {mission_name}</h1>
            <h4 className="mb-3">Launch Details</h4>
            <ul className="list-group">
                <li className="list-group-item">Flight Number: {flight_number}</li>
                <li className="list-group-item">Launch Year: { launch_year}</li>
                <li className="list-group-item">Launch Successful: <span className={classNames({
                    'text-success':launch_success,
                    'text-danger':!launch_success
                })}>{launch_success?'Yes':'NO'}</span></li>
            </ul>
            <h4 className="my-3">Rocket Details</h4>
            <ul className="list-group">
                <li className="list-group-item">Rocket ID: {rocket_id}</li>
                <li className="list-group-item">Rocket Name: { rocket_name}</li>
                <li className="list-group-item">Rocket Type: { rocket_type}</li>
            </ul>
            <hr></hr>
            <Link to="/" className="btn btn-secondary">Back</Link>
        </div>
    )
}

export default Launch

