import HomeComponent from "../Components/HomeComponent";
import CalendarIcon from "../Components/CalendarIcon";
import './Homepage.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const d = new Date();
let year = d.getFullYear();
let numericalMonth = d.getMonth() + 1;
let calendarPath = `${year}%2c%20${numericalMonth}`;

export default function Homepage() {
  // function handleClickRight() {
  //   // setChangeYear(changeYear + 1)
  //   console.log('hi')
  // }

  // function handleClickLeft() {
  //   // setChangeYear(changeYear - 1)
  //   console.log('bye')
  // }

  return (
    <>
    <HomeComponent />
    <div id="day-changer" className="d-flex justify-content-center align-items-center">
      {/* <FontAwesomeIcon onClick={handleClickLeft} className="cursor-pointer arrows arrow-left" icon={faCaretLeft} /> */}
      <Link to={`/year/${calendarPath}`} className='d-flex justify-content-center my-3'>
        <CalendarIcon />
      </Link>
      {/* <FontAwesomeIcon onClick={handleClickRight} className='cursor-pointer arrows arrow-right' icon={faCaretRight} /> */}
    </div>
    </>
  )
}
