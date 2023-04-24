// import CalendarComponent from "../Components/CalendarComponent";
import CalendarIcon from "../Components/CalendarIcon";
import Calendar from "react-calendar";
import '../Components/Calendar.css'
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export default function MonthView() {
  const [dayUrl, setDayUrl] = useState('')
  const { yearAndMonth } = useParams()
  let yearAndMonthNumbers = yearAndMonth.replace(', ', '')
  let calendarYear = parseInt(yearAndMonthNumbers.slice(0, 4))
  let calendarMonth = parseInt(yearAndMonthNumbers.slice(4))

  let fullYearAndMonth = calendarYear + ', ' + calendarMonth

  function handleClick(value, event) {
    console.log(value)
    console.log(event)
    console.log(event.target.ariaLabel)
    let dateArray = event.target.ariaLabel.split(' ');
    let day = dateArray[1].replace(',', '')
    setDayUrl(day)
  }

  return (
    <>
      {/* <CalendarComponent defaultValue={(new Date(2020, 5))} /> */}
      <Link className="text-decoration-none" to={dayUrl}>
        <Calendar onClickDay={handleClick} defaultValue={(new Date(fullYearAndMonth))} className="mx-auto shadow" calendarType='US' minDetail="month" next2Label={null} prev2Label={null} />
      </Link>
      <CalendarIcon />
    </>
  )
}
