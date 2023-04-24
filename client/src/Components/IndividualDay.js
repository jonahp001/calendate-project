import { useParams } from "react-router-dom";
import './IndividualDay.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const hours = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM",
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",]

export default function IndividualDay() {
  const [eventDate, setEventDate] = useState('')
  const [eventOfDay, setEventOfDay] = useState('No events scheduled for the day!')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [eventDiv, setEventDiv] = useState('')

  const { date, yearAndMonth } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);
  const dateNumber = parseInt(date);
  const selectedDate = new Date(yearNumber, monthNumber - 1, dateNumber).toString()
  const calendarDate = `${selectedDate.substring(4, 10)},${selectedDate.substring(10, 15)}`
  console.log(calendarDate)

  let day = selectedDate.substring(0, 3)
  if (day === 'Sun') {
    day = 'Sunday'
  } if (day === 'Mon') {
    day = 'Monday'
  } if (day === 'Tue') {
    day = 'Tuesday'
  } if (day === 'Wed') {
    day = 'Wednesday'
  } if (day === 'Thu') {
    day = 'Thursday'
  } if (day === 'Fri') {
    day = 'Friday'
  } if (day === 'Sat') {
    day = 'Saturday'
  }

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(('/api/entries/1'), { method: 'GET', mode: 'no-cors' })
        if (!res.ok) throw new Error(`fetch Error ${res.status}`)
        const getEntry = await res.json()
        const getDate = getEntry.eventDate
        const getEvent = getEntry.eventDescription
        const getStart = getEntry.startTime
        const getEnd = getEntry.endTime
        if (getDate !== calendarDate) {
          setEventDate('');
          setEventOfDay('');
          setStartTime('');
          setEndTime('');
        }
        // if (getEvent === '' || getEvent === undefined) {
        //   setEventOfDay(eventOfDay)
        // } if (getStart === '' || getStart === undefined) {
        //   setStartTime(startTime)
        // } if (getEnd === '' || getEnd === undefined) {
        //   setEndTime(endTime)
        // }

        if (calendarDate === getDate) {
          setEventDate(getDate)
          setEventOfDay(getEvent)
          setStartTime(getStart)
          setEndTime(getEnd)
        }

      }
      catch (err) {
        console.error(err)
      }
    }

    fetchEvent();

  }, [calendarDate, eventDate, eventOfDay, startTime, endTime])

  function handleDivEventClick() {
    if (eventDiv === '') {
      setEventDiv('event-div')
    }
    if (eventDiv === 'event-div') {
      setEventDiv('')
    }
  }

  function TableRows() {
    console.log(startTime)
    let eventSchedule = '';
    let eventClassColor = '';
    let eventText = '';
    const tableRowMaker = hours.map((timeSlot, index) => {
      if (startTime === timeSlot) {
        eventSchedule = `${startTime}-${endTime}: ${eventOfDay}`;
        eventClassColor = 'event-slot';
        eventText = 'event-text';
      } else {
        eventSchedule = '';
        eventText = '';
      }
      if ((hours.indexOf(endTime)) === hours.indexOf(timeSlot)) {
        eventClassColor = ''
      }
      return (
        <tr key={index}>
          <td className="ps-4 fs-6 time-slot">{timeSlot}</td>
          <td className="px-2 fs-6">
            <div onClick={startTime === timeSlot ? handleDivEventClick : () => { }} className={`overflow-auto table-desc-div ${eventClassColor} ${eventText} ${startTime === timeSlot ? eventDiv : ''}`}>
            {eventSchedule}
          </div>
          </td>
        </tr>
      )
    })
    return tableRowMaker;
  }

  return (
    <>
      <div className="d-flex justify-content-center my-4">
        <div id="table-div" className="mx-auto d-inline-block">
          <table className="table-properties mx-auto">
            <thead className="sticky-top">
              <tr>
                <th colSpan="2" className="table-header text-center fs-2 fw-normal position-relative">
                  {`${day} ${monthNumber}/${dateNumber}/${yearNumber}`}
                  <div className="d-inline ms-2 position-absolute cursor-pointer">
                    <Link className='text-decoration-none float-right link-light' to='eventEdit'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </Link>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <TableRows />
              {/* map <tr> elements and conditionally render event w/ array of times, and then classname >= start time and < endtime */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
