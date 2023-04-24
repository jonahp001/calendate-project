import './CurrentDate.css';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
const d = new Date();
let day = weekday[d.getDay()];
let month = months[d.getMonth()];
let date = d.getDate();
let year = d.getFullYear();

export default function CurrentDate() {
  return (
    <div id="current-date-section" className="justify-content-evenly mx-auto mt-4 shadow">
      <h2>Today's<br></br>Date:</h2>
      <h2>{ day } <br></br>{ month } { date }, { year }</h2>
    </div>
  )
}
