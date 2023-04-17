import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons'
import './TwelveMonths.css'
import { useState, useEffect } from 'react'

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
const d = new Date();
let month = months[d.getMonth()];
let year = d.getFullYear();

export default function TwelveMonths() {
  const [changeYear, setChangeYear] = useState(year);

  function handleClickRight() {
    setChangeYear(changeYear + 1)
  }

  function handleClickLeft() {
    setChangeYear(changeYear - 1)
  }

  useEffect(() => {
    MonthMaker()
  })

  function MonthMaker() {
    const monthRender = months.map((m, index) => {
      let currentMonth = ''
      m === month && changeYear === year ? currentMonth = 'current-month' : currentMonth = '';
      return (
        <div key={index} className='col-4 col-md-3 d-flex'>
          <h3 className={`d-flex justify-content-center align-items-center shadow ${currentMonth}`}>{m}</h3>
        </div>
      )
    })
    return monthRender
  }

  return (
    <>
      <div id='year-changer' className="d-flex justify-content-center align-items-center py-2 shadow">
        <FontAwesomeIcon onClick={handleClickLeft} className="cursor-pointer" icon={faCaretLeft} />
        <p className='mx-5 mb-0'>{ changeYear }</p>
        <FontAwesomeIcon onClick={handleClickRight} className='cursor-pointer' icon={faCaretRight} />
      </div>
      <div className='row m-1'>
        <MonthMaker />
      </div>
    </>
  )
}
