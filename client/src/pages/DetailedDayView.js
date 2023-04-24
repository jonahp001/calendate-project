import IndividualDay from "../Components/IndividualDay";
import IndividualNote from "../Components/IndividualNote";
import CalendarIcon from "../Components/CalendarIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { useParams, useLocation, Link } from "react-router-dom";

const months = ["0 index", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function DetailedDayView() {
  const { yearAndMonth, date } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);
  const dateNumber = parseInt(date);
  const previousDay = new Date(yearNumber, monthNumber - 1, dateNumber)
  const nextDay = new Date(yearNumber, monthNumber - 1, dateNumber)

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

  return (
    <>
      <IndividualDay />
      <IndividualNote />
      <div className="d-flex justify-content-center align-items-center">
        <Link to={useLocation().pathname + `/../../${prevDayUrl}`}>
          <FontAwesomeIcon className="cursor-pointer arrows arrow-left" icon={faCaretLeft} />
        </Link>
        <CalendarIcon />
        <Link to={useLocation().pathname + `/../../${nextDayUrl}`}>
          <FontAwesomeIcon className='cursor-pointer arrows arrow-right' icon={faCaretRight} />
        </Link>
      </div>
    </>
  )
}
