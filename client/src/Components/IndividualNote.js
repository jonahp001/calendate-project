import { useParams, Link } from "react-router-dom";
import './IndividualDay.css'
import { useState, useEffect } from "react";

export default function IndividualNote(eventEntriesNote) {
  const [noteOfDay, setNoteOfDay] = useState('')

  const { date, yearAndMonth } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);
  const dateNumber = parseInt(date);
  const selectedDate = new Date(yearNumber, monthNumber - 1, dateNumber).toString()
  const calendarDate = `${selectedDate.substring(4, 10)},${selectedDate.substring(10, 15)}`

  useEffect(() => {
    let entriesArray = eventEntriesNote.eventEntriesNote
    for (let i = 0; i < entriesArray.length; i++) {
      if (entriesArray[i].notes === '') {
        continue;
      }
      if (entriesArray[i].eventDate !== calendarDate || entriesArray[i].notes === undefined) {
        setNoteOfDay('No notes for the day!');
      }
      if (entriesArray[i].eventDate === calendarDate) {
        setNoteOfDay(entriesArray[i].notes)
      }
    }

  }, [calendarDate, eventEntriesNote])

  return (
    <div id="daily-note-div" className="table-properties mb-4 mx-auto">
      <div className="table-header d-flex align-items-center justify-content-center fst-italic position-relative">
        <h4 className="mb-0">Daily Note:</h4>
        <div className="d-inline position-absolute daily-note-edit cursor-pointer link-light">
          <Link className='text-decoration-none float-right link-light' to='editNote'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
          </Link>
        </div>
      </div>
      <ul className="text-black mt-1">
        <li className="pe-3">{noteOfDay}</li>
      </ul>
    </div>
  )
}
