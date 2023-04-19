import Calendar from 'react-calendar'
import './Calendar.css';
import { useState } from 'react';

export default function CalendarComponent() {
  // const [value, setValue] = useState(new Date());

  function handleClick(e) {
    console.log("im here!")
    console.log(e)
    // console.log(value)
  }

  // function onChange(nextValue) {
  //   setValue(nextValue);
  // }

  return (
    <Calendar onClickDay={handleClick} className="mx-auto shadow" calendarType='US' minDetail="month" next2Label={null} prev2Label={null} />
  )
}
