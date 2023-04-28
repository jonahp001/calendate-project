import CalendarIcon from "../Components/CalendarIcon";
import Calendar from "react-calendar";
import '../Components/Calendar.css'
import { useParams, useNavigate, Link } from "react-router-dom";
// import { useState } from "react";

const months = ["0 index", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


export default function MonthView() {
  const navigate = useNavigate()
  // const [dayUrl, setDayUrl] = useState('')
  const { yearAndMonth } = useParams()
  let yearAndMonthNumbers = yearAndMonth.replace(', ', '')
  let calendarYear = parseInt(yearAndMonthNumbers.slice(0, 4))
  let calendarMonth = parseInt(yearAndMonthNumbers.slice(4))
  let fullYearAndMonth = calendarYear + ', ' + calendarMonth

  function handleClick(value, event) {
    let eventTargetOuterHtml = event.target.outerHTML;
    let dateString = eventTargetOuterHtml.split('">').pop().split('</')[0]
    let monthString = eventTargetOuterHtml.split('="').pop().split(' ')[0]
    let monthIndex = months.indexOf(monthString.slice(0, 3))
    let yearString = eventTargetOuterHtml.split(', ').pop().split('"')[0]
    // let dateArray = event.target.ariaLabel.split(' ');
    // let day = dateArray[1].replace(',', '')
    // setDayUrl(day)
    navigate(`/year/${yearString}%2c%20${monthIndex}/${dateString}`)
  }

  return (
    <>
      {/* <Link className="text-decoration-none" to={dayUrl}> */}
      <Calendar onClickDay={handleClick} defaultValue={(new Date(fullYearAndMonth))} className="mx-auto shadow" calendarType='US' minDetail="month" next2Label={null} prev2Label={null} />
      {/* </Link> */}
      <Link to='/year' className='d-flex justify-content-center my-3'>
        <CalendarIcon />
      </Link>
    </>
  )
}
