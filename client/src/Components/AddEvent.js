import './AddEvent.css'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const hours = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM",
  "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",]

export default function AddEvent({ onSubmit, eventEntries2 }) {
  const [newEventDescription, setNewEventDescription] = useState('')
  const [newStartTime, setNewStartTime] = useState('Select')
  const [newEndTime, setNewEndTime] = useState('Select')
  const [newNote, setNewNote] = useState('');

  const { date, yearAndMonth } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);
  const dateNumber = parseInt(date);
  const selectedDate = new Date(yearNumber, monthNumber - 1, dateNumber).toString()
  const calendarDate = `${selectedDate.substring(4, 10)},${selectedDate.substring(10, 15)}`

  function handleSubmit(event) {
    setNewNote(newNote)
    const addNewEvent = {
      newEventDescription,
      newStartTime,
      newEndTime,
      newNote,
      calendarDate,
    }
    onSubmit(addNewEvent);
  }

  function DropDownStart(entriesArray) {
    entriesArray = eventEntries2;
    let isDisabled = false;
    const dropDownOptions = hours.map(time => {
      for (let i = 0; i < entriesArray.length; i++) {
        if (entriesArray[i].eventDate !== calendarDate) {
          isDisabled = false;
          continue;
        }
        if (entriesArray[i].startTime === time) {
          isDisabled = true;
          break;
        } else if (entriesArray[i].startTime !== time) {
          isDisabled = false;
        }
      }
      return (
        <option disabled={isDisabled} key={time} value={time}>{time}</option>
      )
    })
    return dropDownOptions;
  }

  function DropDownEnd() {
    let isDisabled = false;
    const dropDownOptions = hours.map(time => {
      if (hours.indexOf(time) <= hours.indexOf(newStartTime)) {
        isDisabled = true;
      } else {
        isDisabled = false;
      }
      return (
        <option disabled={isDisabled} key={time} value={time}>{time}</option>
      )
    })
    return dropDownOptions;
  }

  return (
    <div id="add-event" className="mx-auto my-3">
      <h3 className="fw-normal ps-3 d-flex align-items-center">Add Event</h3>
      <form onSubmit={handleSubmit} id="event-form" className="d-flex flex-column justify-content-center align-items-center">
        <textarea required onChange={(e) => setNewEventDescription(e.target.value)} className="my-2" placeholder='Event Description'></textarea>
        <div className='d-flex flex-row align-items-end mb-3'>
          <div className='mx-2'>
            <label className='text-black' htmlFor="start-time">Start Time:</label>
            <select required value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} className='d-block' id="start-time" name='start-time'>
              <option value='Select'>Select</option>
              <DropDownStart />
            </select>
          </div>
          <div className='mx-2'>
            <label className='text-black' htmlFor="end-time">End Time:</label>
            <select required value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} className='d-block' id="start-time" name='end-time'>
              <option value='Select'>Select</option>
              <DropDownEnd />
            </select>
          </div>
          <input className='py-1 mx-2' type="submit" value="Add Event"></input>
        </div>
      </form>
    </div>
  )
}
