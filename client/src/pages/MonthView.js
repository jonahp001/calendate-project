import CalendarComponent from "../Components/CalendarComponent";
import CalendarIcon from "../Components/CalendarIcon";
import Calendar from "react-calendar";
import { useParams } from "react-router-dom";

export default function MonthView() {
  const { yearAndMonth } = useParams()
  let yearAndMonthNumbers = yearAndMonth.replace(', ', '')
  let calendarYear = parseInt(yearAndMonthNumbers.slice(0, 4))
  let calendarMonth = parseInt(yearAndMonthNumbers.slice(4))

  let fullYearAndMonth = calendarYear + ', ' + calendarMonth
  console.log(typeof fullYearAndMonth, fullYearAndMonth)
  return (
    <>
      {/* <CalendarComponent defaultValue={(new Date(2020, 5))} /> */}
      <Calendar defaultValue={(new Date(fullYearAndMonth))} className="mx-auto shadow" calendarType='US' minDetail="month" next2Label={null} prev2Label={null} />
      <CalendarIcon />
    </>
  )
}
