import './Navbar.css'
import {Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="navbar bg-color d-flex align-items-center justify-content-center">
      <Link to='/' className='text-decoration-none'>
        <h1 className="my-0">CalenDate</h1>
      </Link>
    </div>
  )
}
