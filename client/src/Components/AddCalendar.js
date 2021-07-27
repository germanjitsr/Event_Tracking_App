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

export const AddCalendar = () => {


    ////-------------------------------FOR EVENTS-----------------------------------------------------
    const [eventList, setEventList] = useState([])

    //for list in Dropdown
    useEffect(()=>{
       Axios.get('http://localhost:3001/viewE').then((response)=>{
           //console.log(response.data)
           setEventList(response.data)
       })
   },[])
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


   //----------------------------------FOR PERSON LIST------------------------------

   const [peopleList1, setPeopleList1] = useState([])

        //for list
        useEffect(()=>{
            Axios.get('http://localhost:3001/view').then((response)=>{
                //console.log(response.data)
                setPeopleList1(response.data)
            })
        },[])
        const options1 = peopleList1.map(d => ({
              "value" : d.first_name,
              "label" : d.first_name
            }))
        
        const [prsonID, setPrsonID] = useState(options1.label)
        const [frstName, setFrstName] = useState(options1.label) //ge  state of dropdown value

        const handleChangePerson = e =>{
            //setFrstName(e.label) 
                //for filling up form
            Axios.get('http://localhost:3001/view1', { params: { first_name: (e.label)}}).then((response)=>{
            setPrsonID(response.data[0].person_id)    
            setFrstName(response.data[0].first_name)
             })             
        }


   //to get values from text boxes while updating record
   //const [person_id, setPersonID] = useState("")

   var dataUpdate = {
       event_id: evntID, 
       event_date: evntDate,
       person_id: prsonID
   }
   const url = 'http://localhost:3001/addC'
   const headers = {'Content-Type': 'application/json'}
   const updateCalendar = () => {
       console.log("going for post")

       Axios.post(url, dataUpdate, headers).then(function(d){
           console.log(JSON.stringify(d.data))
            if (d.data === 'ER_DUP_ENTRY') {
                alert('Sorry ' + frstName + ' is booked for that day! Checkout his Calendar.')
            }
            else {
                alert('The Calendar for ' + frstName + ' has been updated successfully')
            }
        })
    //window.location.reload()   
    }  
//
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
                   setEvntName(e.target.value)//from handleChang
               }}></Input>
               <Label>Event Date</Label>
               <Input type="date" placeholder="Event date" value={evntDate} onChange={(e)=>{
                   setEvntDate(e.target.value)//from handleChange
                   }}></Input>
                <Input type="hidden" placeholder="" value={prsonID}></Input>
                <Label>Who will attend this event?</Label>
                    <div >
                        <Select
                            //value="" 
                            onChange={handleChangePerson}
                            options={options1} />
                    </div>
           </FormGroup>
           <Button type="button" color="primary" onClick={updateCalendar}>Add to Calendar</Button>
           {/* <Button color="danger" className= "Delete" onClick={deleteEvent}>Delete</Button> */}
           <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
       </Form>
    )
}
