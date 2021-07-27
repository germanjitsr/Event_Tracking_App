import React, {useState, useEffect} from "react"
import Axios from "axios"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import {
    ListGroupItem,
    ListGroup,
} from 'reactstrap'
export const FamilyCalendar = () => {
    const [date, setDate] = useState(new Date())
        ////-------------------------------FOR EVENTS-----------------------------------------------------
    const [eventList, setEventList] = useState([])
  
   const handleChange = (date) =>{
        setDate(date)
       Axios.get('http://localhost:3001/view2E', { params: { event_date: (date)}}).then((response)=>{
        setEventList(response.data)
        })      
   }

   const list= eventList.map((val => {
    return <li key={val.event_name}>{val.event_name}</li>
}))
    
    return (
        <div>
            <Calendar onChange={handleChange} value = {date}></Calendar>

            <h6> </h6>
            <h6>Please click on any date to see if there is any appointment!</h6>
                        <ListGroup >
                            <ListGroupItem variant = "success" className ="list3">
                                {list}
                            </ListGroupItem>        
                        </ListGroup>
        </div>
    )
}