const express = require('express')
const app = express()
const cors = require ('cors')
const mysql = require('mysql')
const PORT = 5000

//Database Configuration
const db= mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    //port:3306,
    user: 'b68bf25d7208e2',
    password: 'ae147b18',
    database: 'heroku_df9fec400578761'
})
//mysql://b68bf25d7208e2:ae147b18@us-cdbr-east-04.cleardb.com/heroku_df9fec400578761?reconnect=true


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// ----------------------------------------------- Person GET POST PUT DELETE starts------------------------------------------------

//get for person list
app.get('/view', (req, res)=>{
    const sqlSelect = "SELECT * FROM person"
    db.query(sqlSelect, (err, result)=>{
        //console.log(result)
        res.send(result)
    })
})

//get for particular person
app.get('/view1', (req, res)=>{
    //console.log("in View1")
    const firstname = req.query.first_name
    //console.log(firstname)
    const sqlSelect = "SELECT * FROM person where first_name=?"
    db.query(sqlSelect, firstname, (err, result)=>{
        //console.log("result in view1 " + result.length)
        res.send(result)
    })
})


//post for person
app.post("/add", (req,res)=>{

    function getMaxID() {
        return new Promise(resolve => {
            const sqlGetMaxID = "SELECT * FROM PERSON where person_id=(SELECT MAX(person_id) from person)"
            db.query(sqlGetMaxID, (err, result)=>{
            //console.log(result.length)
                if (result.length > 0) {
                    personID = (result[0].person_id)
                    //console.log("person ID retrieved from DB " + personID)
                    resolve(personID)
                }
                else {
                    //console.log("This is the first  record")
                    personID = 0
                    resolve(personID)
                }
            })
    })}
        
    
    async function sqlInsert () {

            const personid = await getMaxID()
            if (personid == undefined) {
                personid = 0
            }
            //console.log("personID from getMaxID " + personid)

            const person_id = personid + 1
            const first_name = req.body.first_name
            const last_name = req.body.last_name
            const age = req.body.age
            const sex = req.body.sex

            //console.log("Before insert, person ID = " + person_id)
            const sqlInsert = "INSERT INTO person (person_id, first_name, last_name, age, sex) VALUES (?,?,?,?,?)"
            db.query(sqlInsert, [person_id, first_name, last_name, age, sex], (err, result)=>{
                console.log(result)
            })
        }
        sqlInsert ()
})

    //delete user
    app.delete('/delete/:first_name', (req,res)=> {
        //console.log("In Delete")
        //console.log(req)
        //console.log(req.params)
        const fname = req.params.first_name
        const sqlDelete = "DELETE FROM person where first_name = ?"

        db.query(sqlDelete, fname, (err, result) => {
            if (err) console.log(err)
        })
    })

    //update Person
    app.put('/update', (req,res)=> {
        //console.log("In Update")
        ////console.log(req)
        //console.log(req.body)
        const person_id = req.body.person_id
        const first_name = req.body.first_name
        const last_name = req.body.last_name
        const age = req.body.age
        const sex = req.body.sex
        const sqlUpdate = "UPDATE person SET first_name = ?, last_name= ?, age=?, sex=? where person_id=? "

        db.query(sqlUpdate, [first_name, last_name, age, sex, person_id], (err, result) => {
            if (err) console.log(err)
        })
    })
// ----------------------------------------------- Person GET POST PUT DELETE ends------------------------------------------------


// ----------------------------------------------- Event GET POST PUT DELETE starts------------------------------------------------


//get for person event
app.get('/viewE', (req, res)=>{
    const sqlSelect = "SELECT * FROM EVENTS"
    db.query(sqlSelect, (err, result)=>{
        //console.log(result)
        res.send(result)
    })
})

//get for particular event
app.get('/view1E', (req, res)=>{
    //console.log("in View1E")
    const event_name = req.query.event_name
    //console.log(event_name)
    const sqlSelect = "SELECT * FROM EVENTS where event_name=?"
    db.query(sqlSelect, event_name, (err, result)=>{
        //console.log("result length in view1E = " + result.length)
        res.send(result)
    })
})

//get for particular event
app.get('/view2E', (req, res)=>{
    //console.log("in View2E")
    const event_date = (req.query.event_date).slice(0,10)
    //console.log(event_date)
    const sqlSelect = "SELECT * FROM EVENTS where event_date=?"
    db.query(sqlSelect, event_date, (err, result)=>{
        //console.log("result length in view1E = " + result.length)
        res.send(result)
    })
})

 //update Event
 app.put('/updateE', (req,res)=> {
    //console.log("In UpdateE")
    //console.log(req)
    //console.log(req.body)
    const event_id = req.body.event_id
    const event_name = req.body.event_name
    const event_date = req.body.event_date

    const sqlUpdate = "UPDATE EVENTS SET event_name = ?, event_date= ? where event_id=? "

    db.query(sqlUpdate, [event_name, event_date, event_id], (err, result) => {
        //if (err) console.log(err)
        //console.log(result)
    })
})


 //delete event
 app.delete('/deleteE/:event_name', (req,res)=> {
    //console.log("In DeleteE")
    //console.log(req)
    //console.log(req.params)
    const ename = req.params.event_name
    const sqlDelete = "DELETE FROM EVENTS where event_name = ?"

    db.query(sqlDelete, ename, (err, result) => {
        //if (err) console.log(err)
    })
})

//post for event
app.post("/addE", (req,res)=>{

    function getMaxIdEvent() {
        return new Promise(resolve => {
            //console.log("In getMaxIdEvent")
            const sqlGetMaxIDEvent = "SELECT * FROM EVENTS where event_id=(SELECT MAX(event_id) FROM EVENTS)"
            db.query(sqlGetMaxIDEvent, (err, result)=>{
            //console.log(result)
                if (result.length > 0) {
                    eventID = (result[0].event_id)
                    //console.log("event ID retrieved from DB " + eventID)
                    resolve(eventID)
                }
                else {
                    //console.log("This is the first  record")
                    eventID = 0
                    resolve(eventID)
                }
            })
    })}
        
    async function sqlInsertEvent () {
            //console.log("In sqlInsertEvent")
            const eventid = await getMaxIdEvent()
            if (eventid == undefined) {
                eventid = 0
            }
            //console.log("eventid from getMaxID " + eventid)

            const event_id = eventid + 1
            const event_name = req.body.event_name
            const date = req.body.date

            //console.log("Before insert, Event ID = " + event_id)
            const sqlInsert = "INSERT INTO EVENTS (event_id, event_name, event_date) VALUES (?,?,?)"
            db.query(sqlInsert, [event_id, event_name, date], (err, result)=>{
                console.log(result)
            })
        }
        sqlInsertEvent ()
})

// ----------------------------------------------- Event GET POST PUT DELETE ends------------------------------------------------

// ----------------------------------------------- Calendar GET POST PUT DELETE starts------------------------------------------------

//post for Calendar
app.post("/addC", (req,res)=>{
    //console.log("In addC")
        
    const sqlInsertCalendar = () => {
            //console.log("In sqlInsertCalendar")
            const c_event_id = req.body.event_id
            const c_person_id = req.body.person_id
            const c_event_date = req.body.event_date
            const sqlInsert = "INSERT INTO CALENDAR (c_event_id, c_event_date, c_person_id) VALUES (?,?,?)"
           
            db.query(sqlInsert, [c_event_id, c_event_date, c_person_id], (err, result)=>{
                    if (err) {
                            if (err.code === 'ER_DUP_ENTRY') {
                            //console.log("In DUP entry")
                            console.log(err.code)
                            res.send(err.code)
                            }
                    }
                    else {
                        //console.log("Success Calendar")
                        res.send(result)
                    }
            })
        }
        sqlInsertCalendar ()
})

 //update Event
 app.put('/EditC', (req,res)=> {
    //console.log("In EditC")
    //console.log(req)
    //console.log(req.body)
    const c_event_id = req.body.event_id
    const c_new_person_id = req.body.person_id
    const c_event_date = req.body.event_date

    const sqlUpdate = "UPDATE CALENDAR SET c_event_date= ?, c_new_person_id where c_event_id=? and c_old_person_id =?"

    db.query(sqlUpdate, [c_event_date, c_new_person_id, c_event_id, c_old_person_id], (err, result) => {
        //if (err) console.log(err)
        console.log(result)
    })
})

//get for particular person list based on event ID
app.get('/viewPersonPerEvent', (req, res)=>{
    //console.log("in viewPersonPerEvent")
    const c_event_id = req.query.c_event_id
    //console.log(c_event_id)
    const sqlSelect = "SELECT person_id, first_name from PERSON where person_id IN (SELECT c_person_id FROM CALENDAR where c_event_id =?)"
    const query = db.query(sqlSelect, c_event_id, (err, result)=>{
        //console.log(query.sql)
        //console.log(result)
        res.send(result)
    }
    )
    
})

//get for all event list based on person ID
app.get('/viewEventForAllPerson', (req, res)=>{
    //console.log("in viewEventForAllPerson")
    const c_person_id = req.query.c_person_id
    //console.log(c_person_id)
    const sqlSelect = "SELECT * from CALENDAR where c_person_id =?)"
    const query = db.query(sqlSelect, c_person_id, (err, result)=>{
        //console.log(result)
        res.send(result)
    }
    )
    
})

 //delete event
 app.delete('/deleteC/:person_name', (req,res)=> {
    //console.log("In DeleteC")
    //console.log(req)
    //console.log(req.params)
    const c_person_name = req.params.person_name
    const sqlDelete = "DELETE FROM CALENDAR where c_person_id = (SELECT person_id from PERSON where first_name=?)"

    db.query(sqlDelete, c_person_name, (err, result) => {
        if (err) console.log(err)
    })
})

// ----------------------------------------------- Calendar GET POST PUT DELETE ends------------------------------------------------

//listen
// app.listen(3001, ()=>{
//     console.log("running on port 3001")
// }) 
if (process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build')) //push front end react app into production
}

app.listen(process.env.PORT || PORT, ()=>{
        console.log("server running on " + PORT)
    }) 