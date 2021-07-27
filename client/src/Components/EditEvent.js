import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from "axios"
import Select from 'react-select'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
export const EditEvent = () => {

    const [eventList, setEventList] = useState([])

     //for list in Dropdown
     useEffect(()=>{
        Axios.get('http://localhost:3001/viewE').then((response)=>{
            //console.log(response.data)
            setEventList(response.data)
        })
    })
    const options = eventList.map(d => ({
          "value" : d.event_name,
          "label" : d.event_name
        }))
    
    const [evntID, setEvntID] = useState(options.label)
    const [evntName, setEvntName] = useState(options.label) //ge  state of dropdown value
    const [evntDate, setEvntDate] = useState(options.label) //ge  state of dropdown value
   
    const handleChange = e =>{
        //setFrstName(e.label) 
            //for filling up form
        Axios.get('http://localhost:3001/view1E', { params: { event_name: (e.label)}}).then((response)=>{
            setEvntID(response.data[0].event_id)
            const date = (response.data[0].event_date).slice(0,10);    
            setEvntName(response.data[0].event_name)
            setEvntDate(date)
         })             
    }

    //to get values from text boxes while updating record
    const [eventName, setEventName] = useState("")
    const [eventDate, setEventDate] = useState("")

    var dataUpdate = {
        event_id: evntID,
        event_name: eventName, 
        event_date: eventDate
    }
    const updateEvent = (e) => {
        if (dataUpdate.event_name==='') 
        {
            dataUpdate.event_name=evntName
        }
        if (dataUpdate.event_date==='') 
        {
            dataUpdate.event_date=evntDate
        }

        Axios.put('http://localhost:3001/updateE', dataUpdate , {headers: {'Content-Type': 'application/json'}}).then(alert(evntName + ' updated sucessfully'))
        window.location.reload()     
    }

    const deleteEvent = (e) => {
        if(window.confirm('Are you sure?')){
            Axios.delete('http://localhost:3001/deleteE/'+evntName, { data: { "event_name": {evntName}}} , {headers: {
            'Content-Type': 'application/json'
          }}).then(alert('Event ' + evntName + ' deleted sucessfully'))
        }
        window.location.reload()    
    }

    return (
        <Form>
            <Input type="hidden" placeholder="" value={evntID}></Input>
            <FormGroup>
                <Label>Choose Event</Label>
                    <div >
                        <Select
                            //value="" 
                            onChange={handleChange}
                            options={options} />
                    </div>
                <Label>Event Name</Label>
                <Input type="text" placeholder="Event Name" value={evntName} onChange={(e)=>{
                    setEvntName(e.target.value)//from handleChange
                    setEventName(e.target.value)
                }}></Input>
                <Label>Event Date</Label>
                <Input type="date" placeholder="Event date" value={evntDate} onChange={(e)=>{
                    setEvntDate(e.target.value)//from handleChange
                    setEventDate(e.target.value)}}></Input>
            </FormGroup>
            <Button type="submit" onClick={updateEvent}>Update Details</Button>
            <Button color="danger" className= "Delete" onClick={deleteEvent}>Delete</Button>
            <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
        </Form>
    )
}
