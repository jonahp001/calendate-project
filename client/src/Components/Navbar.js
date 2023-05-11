import './Navbar.css'
import {Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar bg-color d-flex align-items-center justify-content-center">
      <Link to='/' className='text-decoration-none'>
        <h1 className="my-0">CalenDate</h1>
      </Link>
      {/* <div className="me-2">
        <button type="button" className="btn btn-primary shadow-sm">Sign-Up</button>
        <button type="button" className="btn btn-primary shadow-sm ms-2">Sign-In</button>
      </div> */}
    </div>
  )
}
