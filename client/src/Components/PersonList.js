import React, {useState, useEffect} from 'react'
import Axios from "axios"
import {
    ListGroupItem,
    ListGroup,
} from 'reactstrap'
export const PersonList = () => {
    const [peopleList, setPeopleList] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3001/view').then((response)=>{
            setPeopleList(response.data)
        })
    },[])
    
    const list= peopleList.map((val => {
        return <li key={val.first_name}>{val.first_name}</li>
    }))
    
    return (
            <React.Fragment>
                    <ListGroup variant = "flush">
                        <ListGroupItem className ="list">{list}
                        </ListGroupItem>        
                    </ListGroup>        
            </React.Fragment>
         )
}
