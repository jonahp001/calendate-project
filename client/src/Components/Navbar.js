import './Navbar.css'
import {Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar bg-color d-flex align-items-center">
      <Link to='/' className='text-decoration-none'>
        <h1 className="ms-2 my-0">CalenDate</h1>
      </Link>
      <div className="me-2">
        <button type="button" className="btn btn-primary shadow-sm">Sign-Up</button>
        <button type="button" className="btn btn-primary shadow-sm ms-2">Sign-In</button>
      </div>
      {/* <a href='calendarMonth'>TEST</a> */}
      {/* <nav>
        <ul>
          <li>
            <Link to="month">Month View</Link>
          </li>
          <li>
            <Link to="year">Year View</Link>
          </li>
        </ul>
      </nav>
      <Outlet /> */}
    </div>
  )
}
