import {Routes, Route} from 'react-router-dom'
import './App.css';
import CurrentDate from './Components/CurrentDate';
import Navbar from './Components/Navbar';
import TwelveMonths from './Components/TwelveMonths';
import Homepage from './pages/Homepage';
import MonthView from './pages/MonthView';
import DetailedDayView from './pages/DetailedDayView';
import EditEventView from './pages/EditEventView';
import EditNoteView from './pages/EditNoteView';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <CurrentDate />
      <Routes>
        <Route path='/'>
          <Route index element={<Homepage />} />
          <Route path='/year'>
            <Route index element={<TwelveMonths />} />
            <Route path=':yearAndMonth'>
              <Route index element={<MonthView />} />
              <Route path=':date'>
                <Route index element={<DetailedDayView />} />
                <Route path='editEvent' element={<EditEventView />}/>
                <Route path='editNote' element={<EditNoteView />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
