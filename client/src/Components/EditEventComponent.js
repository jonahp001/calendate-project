import { useParams } from "react-router-dom";
import './IndividualDay.css'
import { useState } from "react";
import { Link } from "react-router-dom";

const hours = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM",
  "5:30 PM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",]

export default function EditEventComponent(eventEntries) {
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

  function handleDivEventClick() {
    if (eventDiv === '') {
      setEventDiv('event-div')
    }
    if (eventDiv === 'event-div') {
      setEventDiv('')
    }
  }

  function TableRows(entriesArray) {
    entriesArray = eventEntries.eventEntries;
    let eventSchedule = '';
    let eventClassColor = '';
    let eventText = '';
    let startEventTime = ''
    const tableRowMaker = hours.map((timeSlot, index) => {
      for (let i = 0; i < entriesArray.length; i++) {
        if (entriesArray[i].startTime === timeSlot && entriesArray[i].eventDate === calendarDate) {
          eventSchedule = `${entriesArray[i].startTime}-${entriesArray[i].endTime}: ${entriesArray[i].eventDescription}`;
          eventClassColor = 'event-slot';
          eventText = 'event-text';
          startEventTime = entriesArray[i].startTime
          break;
        } else {
          eventSchedule = '';
          eventText = '';
        }
        if (entriesArray[i].eventDate === calendarDate && (hours.indexOf(entriesArray[i].endTime)) === hours.indexOf(timeSlot)) {
          eventClassColor = ''
        }
      }

      return (
        <tr key={index}>
          <td className="ps-4 fs-6 time-slot">{timeSlot}</td>
          <td className="px-2 fs-6">
            <div onClick={startEventTime === timeSlot ? handleDivEventClick : () => { }} className={`overflow-auto table-desc-div ${eventClassColor} ${eventText} ${startEventTime === timeSlot ? eventDiv : ''}`}>
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
                  <div className="position-absolute cursor-pointer">
                    <Link className='ms-1 text-decoration-none link-light' to='../'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
                      </svg>
                    </Link>
                  </div>
                  {`${day} ${monthNumber}/${dateNumber}/${yearNumber}`}
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
