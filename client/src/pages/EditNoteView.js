import DayScheduleComponent from "../Components/DayScheduleComponent";
import EditNoteComponent from "../Components/EditNoteComponent";
import CalendarIcon from "../Components/CalendarIcon";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const months = ["0 index", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function EditNoteView() {
  const [eventEntries, setEventEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { yearAndMonth, date } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);
  let currentDate = `${months[monthNumber]} ${date}, ${yearNumber}`;
  let calendarPath = `${yearNumber}%2c%20${monthNumber}`

  async function addNote(addNewNote) {
    try {
      const res = await fetch(('/api/entries/1'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(addNewNote) })
      if (!res.ok) throw new Error(`fetch Error ${res.status}`)
    }
    catch (err) {
      console.error(err)
    }
  }

  async function editNote(editNote, entryId) {
    for (let i = 0; i < eventEntries.length; i++) {
      if (currentDate === eventEntries[i].eventDate && eventEntries[i].notes) {
        entryId = eventEntries[i].entryId;
      }
    }
    try {
      const res = await fetch((`/api/entries/1/${entryId}`), { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editNote) })
      if (!res.ok) throw new Error(`fetch Error ${res.status}`)
    }
    catch (err) {
      console.error(err)
    }
  }

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
        setError(err)
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchEvent();

  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error('Fetch error:', error);
    return <div>Error! {error.message}</div>;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <DayScheduleComponent eventEntries={eventEntries} />
          </div>
          <div className="col">
            <EditNoteComponent eventEntriesNote={eventEntries} onSubmit={addNote} editNote={editNote}/>
          </div>
          <div className="d-flex justify-content-center align-items-center pb-3">
            <Link to={`/year/${calendarPath}`} className='d-flex justify-content-center my-3'>
              <CalendarIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
