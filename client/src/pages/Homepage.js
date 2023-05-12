import HomeComponent from "../Components/HomeComponent";
import CalendarIcon from "../Components/CalendarIcon";
import './Homepage.css'
import { Link } from "react-router-dom";

const d = new Date();
let year = d.getFullYear();
let numericalMonth = d.getMonth() + 1;
let calendarPath = `${year}%2c%20${numericalMonth}`;

export default function Homepage() {
  return (
    <>
    <HomeComponent />
    <div id="day-changer" className="d-flex justify-content-center align-items-center">
      <Link to={`/year/${calendarPath}`} className='d-flex justify-content-center my-3'>
        <CalendarIcon />
      </Link>
    </div>
    </>
  )
}
