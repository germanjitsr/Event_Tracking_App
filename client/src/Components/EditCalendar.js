import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from "axios"
import Select from 'react-select'
import {
    Form,
    FormGroup,
    Label,
    Input,
    ListGroupItem
} from 'reactstrap'

export const EditCalendar = () => {


    ////-------------------------------FOR EVENTS-----------------------------------------------------
    const [eventList, setEventList] = useState([])

    //for list in Dropdown
    useEffect(()=>{
       Axios.get('https://eventtrackingapp.herokuapp.com/viewE').then((response)=>{
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
  
   const handleChange = (e) =>{
       //setFrstName(e.label) 
           //for filling up form
       Axios.get('https://eventtrackingapp.herokuapp.com/view1E', { params: { event_name: (e.label)}}).then((response)=>{
           setEvntID(response.data[0].event_id)
           const date = (response.data[0].event_date).slice(0,10);    
           setEvntName(response.data[0].event_name)
           setEvntDate(date)
           handleChangePerson(response.data[0].event_id)
        })
        
   }

   //----------------------------------FOR PERSON LIST------------------------------

   const [peopleList2, setPeopleList2] = useState([])  

        const  handleChangePerson =  (e) =>{
            //alert(e)
            Axios.get('https://eventtrackingapp.herokuapp.com/viewPersonPerEvent', { params: {'c_event_id': (e)}}).then((response)=>{
                setPeopleList2(response.data)
            })        
        }

        const listFirstName= peopleList2.map((val => {
            return <li key={val.first_name}>{val.first_name}</li>
        }))
  /// For person list ends
  
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
               <Input type="date" placeholder="Event date" value={evntDate}//from handleChange
                   ></Input>
                <Label>Who will be attending this event?</Label>
                     <ListGroupItem className ="list1">{listFirstName}</ListGroupItem>
           </FormGroup>
           <Link to="/" className="btn btn-danger ml-2">Back to main page</Link>
       </Form>
    )
}
