import './Navbar.css'

export default function Navbar() {
  return (
    <div className="navbar bg-color d-flex align-items-center">
      <h1 className="ms-2 my-0">CalenDate</h1>
      <div className="me-2">
        <button type="button" className="btn btn-primary shadow-sm">Sign-Up</button>
        <button type="button" className="btn btn-primary shadow-sm ms-2">Sign-In</button>
      </div>
    </div>
  )
}
