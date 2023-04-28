import IndividualDay from "../Components/IndividualDay";
import IndividualNote from "../Components/IndividualNote";
import CalendarIcon from "../Components/CalendarIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const months = ["0 index", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function DetailedDayView() {
  const [eventEntries, setEventEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { yearAndMonth, date } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);
  const dateNumber = parseInt(date);
  const previousDay = new Date(yearNumber, monthNumber - 1, dateNumber)
  const nextDay = new Date(yearNumber, monthNumber - 1, dateNumber)

  let calendarPath = `${yearNumber}%2c%20${monthNumber}`

  previousDay.setDate(previousDay.getDate() - 1)
  nextDay.setDate(nextDay.getDate() + 1)

  let previousDayNumbers = previousDay.toString().slice(4, 15)
  let nextDayNumbers = nextDay.toString().slice(4, 15)
  let prevDayParts = previousDayNumbers.split(' ')
  let nextDayParts = nextDayNumbers.split(' ')
  const [prevMonthString, prevDateString, prevYearString] = prevDayParts;
  const [nextMonthString, nextDateString, nextYearString] = nextDayParts;
  const prevMonthNum = months.indexOf(prevMonthString);
  const prevYearNum = parseInt(prevYearString);
  const prevDateNum = parseInt(prevDateString);
  const nextMonthNum = months.indexOf(nextMonthString);
  const nextYearNum = parseInt(nextYearString);
  const nextDateNum = parseInt(nextDateString);

  const prevDayUrl = `${prevYearNum}%2c%20${prevMonthNum}/${prevDateNum}`
  const nextDayUrl = `${nextYearNum}%2c%20${nextMonthNum}/${nextDateNum}`

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
      <IndividualDay eventEntries={eventEntries} />
      <IndividualNote eventEntriesNote={eventEntries} />
      <div className="d-flex justify-content-center align-items-center pb-3">
        <Link to={`../../${prevDayUrl}`}>
          <FontAwesomeIcon className="cursor-pointer arrows arrow-left" icon={faCaretLeft} />
        </Link>
        <Link to={`/year/${calendarPath}`} className='d-flex justify-content-center my-3'>
          <CalendarIcon />
        </Link>
        <Link to={`../../${nextDayUrl}`}>
          <FontAwesomeIcon className='cursor-pointer arrows arrow-right' icon={faCaretRight} />
        </Link>
      </div>
    </>
  )
}
