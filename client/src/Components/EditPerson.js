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
export const EditPerson = () => {

        const [peopleList, setPeopleList] = useState([])

        //for list
        useEffect(()=>{
            Axios.get('http://localhost:3001/view').then((response)=>{
                setPeopleList(response.data)
            })
        },[])
        const options = peopleList.map(d => ({
              "value" : d.first_name,
              "label" : d.first_name
            }))
        
        const [prsonID, setPrsonID] = useState(options.label)
        const [frstName, setFrstName] = useState(options.label) //ge  state of dropdown value
        const [lstName, setLstname] = useState(options.label) //ge  state of dropdown value
        const [age1, setAge1] = useState(options.label) //ge  state of dropdown value
        const [sex1, setSex1] = useState(options.label) //ge  state of dropdown value

        const handleChange = e =>{
                //for filling up form
            Axios.get('http://localhost:3001/view1', { params: { first_name: (e.label)}}).then((response)=>{
            console.log(response.data[0].first_name)
            setPrsonID(response.data[0].person_id)    
            setFrstName(response.data[0].first_name)
            setLstname(response.data[0].last_name)
            setAge1(response.data[0].age)
            setSex1(response.data[0].sex)
             })             
        }

        const deletePerson = (e) => {
            if(window.confirm('Are you sure?')){
                Axios.delete('http://localhost:3001/delete/'+frstName, { data: { "first_name": {frstName}}} , {headers: {
                'Content-Type': 'application/json'
              }}).then(alert(frstName + ' deleted sucessfully'))
            }
            window.location.reload()    
        }

        //to get values from text boxes while updating record
        const [firstName, setFirstName] = useState("")
        const [lastName, setLastName] = useState("")
        const [age, setAge] = useState("")
        const [sex, setSex] = useState("")

        var dataUpdate = {
            person_id: prsonID,
            first_name: firstName, 
            last_name: lastName, 
            age: age, 
            sex: sex
        }
        
        const updatePerson = (e) => {
            if (dataUpdate.first_name=='') 
            {
                dataUpdate.first_name=frstName
            }
            if (dataUpdate.last_name=='') 
            {
                dataUpdate.last_name=lstName
            }
            if (dataUpdate.age=='') 
            {
                dataUpdate.age=age1
            }
            if (dataUpdate.sex=='') 
            {
                dataUpdate.sex=sex1
            }
            Axios.put('http://localhost:3001/update', dataUpdate , {headers: {'Content-Type': 'application/json'}}).then(alert(frstName + ' updated sucessfully'))
            window.location.reload()     
        }

        const optionsGender = [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
        ]

    return (
        <Form>
            <FormGroup>
            <Input type="hidden" placeholder="" value={prsonID}></Input>
                <Label>Choose Person</Label>
                    <div >
                        <Select
                            //value="" 
                            onChange={handleChange}
                            options={options} />
                    </div>
                <Label>First Name</Label>
                <Input type="text" placeholder="" value={frstName} onChange={(e)=>{
                    setFrstName(e.target.value)//from handleChange
                    setFirstName(e.target.value)
                }}></Input>
                <Label>Last Name</Label>
                <Input type="text" placeholder="" value={lstName} onChange={(e)=>{
                    setLstname(e.target.value)
                    setLastName(e.target.value)
                }}></Input>
                <Label>Age</Label>
                <Input type="number" placeholder="" value={age1} onChange={(e)=>{
                    setAge1(e.target.value)
                    setAge(e.target.value)
                }}></Input>
                <Label>Gender</Label>
                    <div >
                        <Select 
                            value={sex1}
                            onChange={(e)=>{
                                setSex1(e.label)
                                setSex(e.label)
                            }}
                            options={optionsGender} />
                    </div>
                <Input type="text" placeholder="" value={sex1} onChange={(e)=>{
                    setSex1(e.target.value)
                    setSex(e.target.value)
                }}> </Input>
            </FormGroup>
            <Button color="primary" onClick={updatePerson}>Update Details</Button>
            <Button color="danger" className= "Delete" onClick={deletePerson}>Delete</Button>
            <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
        </Form>
    )
}
