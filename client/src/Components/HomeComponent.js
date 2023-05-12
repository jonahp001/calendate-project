import './HomeComponent.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let year = d.getFullYear();
let numericalMonth = d.getMonth() + 1;
let day = d.getDate();
let dayOfTheWeek = weekday[d.getDay()];

const selectedDate = new Date(year, numericalMonth - 1, day).toString()
const calendarDate = `${selectedDate.substring(4, 10)},${selectedDate.substring(10, 15)}`

export default function HomeComponent() {
  const [eventEntries, setEventEntries] = useState([])

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(('/api/entries/1'), { method: 'GET', mode: 'no-cors' })
        if (!res.ok) throw new Error(`fetch Error ${res.status}`)
        const getEntries = await res.json()
        setEventEntries(getEntries);
      }
      catch (err) {
        console.error(err)
      }
    }

    fetchEvent();

  }, [])

  function HomepageEvents() {
    let eventsArray = [];
    let eventOfDay = 'No events scheduled for the day!';
    for (let i = 0; i < eventEntries.length; i++) {
      if (eventEntries[i].eventDate === calendarDate && eventEntries[i].eventDescription === "") {
        continue;
      }
      if (eventEntries[i].eventDate === calendarDate) {
        eventOfDay = `${eventEntries[i].startTime}-${eventEntries[i].endTime}: ${eventEntries[i].eventDescription}`
        eventsArray.push(
          <p key={eventEntries[i].entryId} className='fs-6 mx-3 mb-1'>{eventOfDay}</p>
        )
      }
    }
    if (!eventsArray.length) {
      eventsArray.push(
        <p key={0} className='fs-6 mx-3 mb-1'>{eventOfDay}</p>
      )
    }
    return eventsArray
  }

  function HomepageNotes() {
    let notesArray = [];
    let noteOfDay = 'No notes for the day!';
    for (let i = 0; i < eventEntries.length; i++) {
      if ((eventEntries[i].eventDate === calendarDate && eventEntries[i].notes === "") || (eventEntries[i].eventDate !== calendarDate || eventEntries[i].notes === undefined)) {
        continue;
      }
      if (eventEntries[i].eventDate === calendarDate) {
        noteOfDay = eventEntries[i].notes
        notesArray.push(
          <p key={eventEntries[i].entryId} className='fs-6 mx-3 mb-1'>{noteOfDay}</p>
        )
      }
    }
    if (!notesArray.length) {
      notesArray.push(
        <p key={0} className='fs-6 mx-3 mb-1'>{noteOfDay}</p>
      )
    }
    return notesArray
  }

  return (
    <div className='container'>
      <div className='day-content shadow text-center mx-2 mx-sm-4 my-4 px-0'>
        <div className='justify-content-center'>
          <h3 className='py-2'>{dayOfTheWeek} {`${numericalMonth}/${day}/${year}`}</h3>
          <div className='row'>
            <div className='col-sm text-height my-4 px-0 mx-2'>
              <h4 className='fw-bold'>Events:</h4>
              <HomepageEvents />
            </div>
            <div className='col-sm text-height my-4 px-0 mx-2'>
              <h4 className='fst-italic fw-bold'>Daily Note:</h4>
              <HomepageNotes />
            </div>
          </div>
        </div>
        <Link to={`year/${year}%2c%20${numericalMonth}/${day}`}>
          <button id='view-the-day-button' className='mb-5 mb-sm-4 py-3 px-3 fw-bold shadow' type='button' >View The Day</button>
        </Link>
      </div>
    </div>
  )
}
