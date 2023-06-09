import { useParams, Link, useNavigate } from "react-router-dom";
import './IndividualDay.css'
import './EditNoteComponent.css'
import { useState, useEffect } from "react";

export default function EditNoteComponent( {eventEntriesNote, onSubmit, editNote}) {
  const [noteOfDay, setNoteOfDay] = useState('')
  const [existingNote, setExistingNote] = useState('')
  const [newEventDescription, setNewEventDescription] = useState('')
  const [newStartTime, setNewStartTime] = useState('')
  const [newEndTime, setNewEndTime] = useState('')
  const [newNote, setNewNote] = useState('');
  const navigate = useNavigate();

  const { date, yearAndMonth } = useParams();
  const noComma = yearAndMonth.replace(',', '')
  const dateParts = noComma.split(' ')
  const [yearStr, monthStr] = dateParts;
  const yearNumber = parseInt(yearStr);
  const monthNumber = parseInt(monthStr);
  const dateNumber = parseInt(date);
  const selectedDate = new Date(yearNumber, monthNumber - 1, dateNumber).toString()
  const calendarDate = `${selectedDate.substring(4, 10)},${selectedDate.substring(10, 15)}`

  function handleAdd() {
    setNewEventDescription('');
    setNewStartTime('');
    setNewEndTime('');
    const addNewEvent = {
      newEventDescription,
      newStartTime,
      newEndTime,
      newNote,
      calendarDate,
    }
    onSubmit(addNewEvent);
  }

  function handleChange() {
    setNewEventDescription('');
    setNewStartTime('');
    setNewEndTime('');
    const addNewEvent = {
      newEventDescription,
      newStartTime,
      newEndTime,
      newNote,
      calendarDate,
    }
    editNote(addNewEvent);
  }

  function handleSubmit(event) {
    event.preventDefault();
    for (let i = 0; i < eventEntriesNote.length; i++) {
      if (eventEntriesNote[i].notes !== '' && eventEntriesNote[i].eventDate === calendarDate) {
        handleChange();
        navigate('..');
        return
      }
    }
    handleAdd();
    navigate('..');
  }

  useEffect(() => {
    let entriesArray = eventEntriesNote;
    for (let i = 0; i < entriesArray.length; i++) {
      if (entriesArray[i].notes === '') {
        continue;
      }
      if (entriesArray[i].eventDate !== calendarDate || entriesArray[i].notes === undefined) {
        setNoteOfDay('No notes for the day!');
        setExistingNote('')
      }
      if (entriesArray[i].eventDate === calendarDate) {
        setNoteOfDay(entriesArray[i].notes)
        setExistingNote(entriesArray[i].notes)
      }
    }
  }, [calendarDate, eventEntriesNote])

  function NoteFormButton() {
    let buttonName = 'Add Note'
    for (let i = 0; i < eventEntriesNote.length; i++) {
      if (eventEntriesNote[i].eventDate === calendarDate) {
        buttonName = 'Update Note'
      }
    }
    return (
      <input className='py-1 mb-3' type="submit" value={buttonName}></input>
    )
  }

  return (
    <div id="edit-note-div" className="table-properties my-3 mx-auto">
      <div className="table-header d-flex align-items-center justify-content-center fst-italic position-relative">
        <div className="cursor-pointer">
          <Link className='text-decoration-none link-light' to='../'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
            </svg>
          </Link>
        </div>
        <h4 className="mb-0 mx-5">Daily Note:</h4>
        <div className="ms-5 cursor-pointer">
        </div>
      </div>
      <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center'>
        <textarea onChange={(e) => setNewNote(e.target.value)} className="my-4" placeholder={noteOfDay} defaultValue={existingNote}></textarea>
        <NoteFormButton />
      </form>
    </div>
  )
}
