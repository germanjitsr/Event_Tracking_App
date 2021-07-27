import './App.css';
import React from "react"
import {Home} from "./Components/Home"
import {AddPerson} from "./Components/AddPerson"
import {EditPerson} from "./Components/EditPerson"
import { AddEvent } from './Components/AddEvent';
import { EditEvent } from './Components/EditEvent';
import { AddCalendar } from './Components/AddCalendar';
import { EditCalendar } from './Components/EditCalendar';
import { DeleteCalendar } from './Components/DeleteCalendar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
      <div style = {{ backgroundColor: "#80ced6", width: "820px", minHeight: "300px"}}>
        <Router>
          <h1 style={{ padding: "10px 20px", textAlign: "center", color: "Black"}}>Family Calendar</h1>
          <Switch>
            <Route exact path ="/" component={Home} />
            <Route exact path ="/add" component={AddPerson} />
            <Route exact path ="/edit" component={EditPerson} />
            <Route exact path ="/addE" component={AddEvent} />
            <Route exact path ="/editE" component={EditEvent} />
            <Route exact path ="/addC" component={AddCalendar} />
            <Route exact path ="/editC" component={EditCalendar} />
            <Route exact path ="/deleteC" component={DeleteCalendar} />
          </Switch>
        </Router>
        
      </div>    
  );
}

export default App;
