import React, {useState} from 'react'
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

export const AddPerson = () => {

    //to get values from form
    const [person_id, setPersonID] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    
    const addPerson= () => {

        const url = 'http://localhost:3001/add'
        const data = {
            //ID will be created at backend
            first_name: firstName, 
            last_name: lastName, 
            age: age, 
            sex: sex
        }
        const headers = { 'content-type': 'application/json;charset=UTF-8'  }

        Axios.post(url, data, headers)
        .then(alert(firstName + ' added successfully')
       )}
    
       const options = [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
        ]
    return (
        <Form>
            <FormGroup>
                <Label>First Name</Label>
                <Input type="text" placeholder="Enter First Name" onChange={(e)=>{
                    setFirstName(e.target.value)
                }}></Input>
                <Label>Last Name</Label>
                <Input type="text" placeholder="Enter Last Name" onChange={(e)=>{
                    setLastName(e.target.value)
                }}></Input>
                <Label>Age</Label>
                <Input type="number" placeholder="Enter Age" onChange={(e)=>{
                    setAge(e.target.value)
                }}></Input>
                <Label>Gender</Label>
                    <div >
                        <Select 
                        onChange={(e)=>{
                            setSex(e.label)}}
                        options={options} />
                    </div>
            </FormGroup>
            <Button type="submit" onClick={addPerson}>Submit</Button>
            <Link to="/" className="btn btn-danger ml-2">Cancel</Link>  

        </Form> 
    )
}
