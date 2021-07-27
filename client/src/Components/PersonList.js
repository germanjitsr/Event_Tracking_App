import React, {useState, useEffect} from 'react'
import Axios from "axios"
import {
    ListGroupItem,
    ListGroup,
} from 'reactstrap'
export const PersonList = () => {
    const [peopleList, setPeopleList] = useState([])

    useEffect(()=>{
        Axios.get('https://eventtrackingapp.herokuapp.com/view').then((response)=>{
            setPeopleList(response.data)
        })
    },[])
    
    const list= peopleList.map((val => {
        return <li key={val.first_name}>{val.first_name}</li>
    }))
    
    return (
            <React.Fragment>
                <h7>List of Family Members</h7>
                    <ListGroup variant = "flush">
                        <ListGroupItem className ="list">{list}
                        </ListGroupItem>        
                    </ListGroup>        
            </React.Fragment>
         )
}
