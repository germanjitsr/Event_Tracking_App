import React, {useState, useEffect} from 'react'
import Axios from "axios"
import {
    ListGroupItem,
    ListGroup,
} from 'reactstrap'
export const EventList = () => {

    const [eventList, setEventList] = useState([])

    useEffect(()=>{
        Axios.get('https://eventtrackingapp.herokuapp.com/viewE').then((response)=>{
            setEventList(response.data)
        })
    },[])
    
    const list= eventList.map((val => {
        return <li key={val.event_name}>{val.event_name}</li>
    }))

    return (
        <React.Fragment>
            <h7>List of all family appointments</h7>
                    <ListGroup variant = "flush">
                        <ListGroupItem className ="list">{list}
                        </ListGroupItem>        
                    </ListGroup>        
            </React.Fragment>       
    )
}
