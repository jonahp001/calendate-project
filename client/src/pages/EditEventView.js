import CalendarIcon from "../Components/CalendarIcon";
import '../Components/AddEvent.css'
import '../Components/IndividualDay.css'
import { useState, useEffect } from "react";
import AddEvent from "../Components/AddEvent";
import EditEventComponent from "../Components/EditEventComponent";
import { Link, useParams } from "react-router-dom";

export default function EditEventView() {
  const [eventEntries, setEventEntries] = useState([])

  async function addEventAndTimes(addNewEvent) {
    try {
      const res = await fetch(('/api/entries/1'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(addNewEvent) })
      if (!res.ok) throw new Error(`fetch Error ${res.status}`)
      const addedEvent = await res.json()
      console.log(addedEvent)
    }
    catch (err) {
      console.error(err)
    }
  }

  const { yearAndMonth } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);

  let calendarPath = `${yearNumber}%2c%20${monthNumber}`

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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <EditEventComponent eventEntries={eventEntries} />
          </div>
          <div className="col">
            <AddEvent eventEntries2={eventEntries} onSubmit={addEventAndTimes} />
          </div>
          <div className="d-flex justify-content-center align-items-center pb-4">
            <Link to={`/year/${calendarPath}`} className='d-flex justify-content-center my-3'>
              <CalendarIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
