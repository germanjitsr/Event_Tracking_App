import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from "axios"
import Select from 'react-select'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ListGroupItem
} from 'reactstrap'

export const EditCalendar = () => {


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
  
   const handleChange = (e) =>{
       //setFrstName(e.label) 
           //for filling up form
       Axios.get('http://localhost:3001/view1E', { params: { event_name: (e.label)}}).then((response)=>{
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
            Axios.get('http://localhost:3001/viewPersonPerEvent', { params: {'c_event_id': (e)}}).then((response)=>{
                setPeopleList2(response.data)
            })        
        }

        // const listPersonID= peopleList2.map((val => {
        //     return <li key={val.person_id}>{val.person_id}</li>
        // }))
        // const listFirstName = peopleList2.map(d => ({
        //     "value" : d.first_name,
        //     "label" : d.first_name
        //   }))

        const listFirstName= peopleList2.map((val => {
            return <li key={val.first_name}>{val.first_name}</li>
        }))
  /// For person list ends
  
  //Edit Calender

   ///to get values from text boxes while updating record
//    const [person_id, setPersonID] = useState("")

//    var dataUpdate = {
//        event_id: evntID, 
//        event_date: evntDate,
//        person_id: listPersonID
//    }
//    const url = 'http://localhost:3001/EditC'
//    const headers = {'Content-Type': 'application/json'}
//    const editCalendar = () => {
//        console.log("going for put")

//        Axios.put(url, dataUpdate, headers).then(function(d){
//            console.log(JSON.stringify(d.data))
//             // if (d.data === 'ER_DUP_ENTRY') {
//             //     alert('Sorry ' + frstName + ' is booked for that day! Checkout his Calendar.')
//             // }
//             // else {
//             //     alert('The Calendar for ' + frstName + ' has been updated successfully')
//             // }
//         })
//     window.location.reload()   
//     }  

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
                {/* <Input type="hidden" placeholder="" value={listPersonID}></Input> */}
                <Label>Who will be attending this event?</Label>
                    {/* <div >
                        <Select
                            //value="" 
                            options={listFirstName} />
                    </div> */}
                     <ListGroupItem className ="list1">{listFirstName}</ListGroupItem>
           </FormGroup>
           {/* <Button type="button" color="primary" onClick={editCalendar}>Update Attendees?</Button> */}
           {/* <Button color="danger" className= "Delete" onClick={deleteCalendar}>Delete</Button> */}
           <Link to="/" className="btn btn-danger ml-2">Back to main page</Link>
       </Form>
    )
}
