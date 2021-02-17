import gql from 'graphql-tag'
import {useQuery} from '@apollo/client';
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'
import React from 'react'
const LAUNCHES_QUERY=gql`
    query LaunchesQuery{
        launches{
            flight_number,
            mission_name,
            launch_date_local,
            launch_success,
        }
    }`


const Launches =()=>{
    const { loading, error, data } = useQuery(LAUNCHES_QUERY)
    if(error) console.log(error)
    // else console.log(data)
    return (
        <React.Fragment>
            <h1 className="display-4 my-3">Launches</h1>
            <MissionKey></MissionKey>
            {loading?<h4>Loading.....</h4>:null}
            {!loading?
                data.launches.map(launch=>(
                    <LaunchItem key={launch.flight_number} launch={launch}></LaunchItem>
                )):null
            }
        </React.Fragment>
    )
}



export default Launches

