import React from 'react'
import {HeadingEvents} from './HeadingEvents'
import { HeadingPerson } from './HeadingPerson'
import { PersonList } from './PersonList'
import { EventList } from './EventList'
import {HeadingCalendar} from './HeadingCalendar'
import {FamilyCalendar} from './FamilyCalendar'
export const Home = () => {
    return (
        <>
                    <HeadingCalendar />
                    <FamilyCalendar />
                    <HeadingPerson />
                    <PersonList />
                    <HeadingEvents />
                    <EventList />       
        </>
    )
}
