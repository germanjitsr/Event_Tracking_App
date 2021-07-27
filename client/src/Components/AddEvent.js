import React, { useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from "axios"
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
export const AddEvent = () => {
    
    //to get values from form
    const [eventName, setEventName] = useState("")
    const [date, setDate] = useState("")

    const addEvent= () => {

        const url = 'https://eventtrackingapp.herokuapp.com/addE'
        const data = {
            //ID will be created at backend
            event_name: eventName, 
            date: date
        }
        
        const headers = { 'content-type': 'application/json;charset=UTF-8'  }

        Axios.post(url, data, headers)
        .then(alert('The Event ' + eventName + ' has been added successfully')
        )
        window.location.reload()}

    return (
        <Form>
            <FormGroup>
                <Label>Event Name</Label>
                <Input type="text" placeholder="Event Name" onChange={(e)=>{
                                setEventName(e.target.value)
                            }}></Input>
                <Label>Event Date</Label>
                <Input type="date" placeholder="Event date" onChange={(e)=>{
                                setDate(e.target.value)
                            }}></Input>
            </FormGroup>
            <Button type="submit" onClick={addEvent}>Submit</Button>
            <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
        </Form>
    )
}
