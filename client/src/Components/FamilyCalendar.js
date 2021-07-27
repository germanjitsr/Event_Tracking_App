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
        //    setEvntID(response.data[0].event_id)
        //    const date = (response.data[0].event_date).slice(0,10);    
        //    setEvntName(response.data[0].event_name)
        //    setEvntDate(date)
        setEventList(response.data)
           //handleChangePerson(response.data[0].event_id)
        })      
   }

   const list= eventList.map((val => {
    return <li key={val.event_name}>{val.event_name}</li>
}))
    
    return (
        <div>
            <Calendar onChange={handleChange} value = {date}></Calendar>


            <p>On {date.toDateString()}, The appointment(s) are:</p>
                        <ListGroup >
                            <ListGroupItem variant = "success" className ="list3">
                                {list}
                                {/* {(() => {
                                    if ({list}.length >0) {
                                        list
                                    }
                                    else {
                                        <p>No appointments for anyone!</p>
                                    }
                                })} */}
                            </ListGroupItem>        
                        </ListGroup>
        </div>
    )
}