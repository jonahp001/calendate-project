// import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
// import CalendarComponent from './Components/CalendarComponent';
import CurrentDate from './Components/CurrentDate';
import Navbar from './Components/Navbar';
// import CalendarIcon from './Components/CalendarIcon';
import TwelveMonths from './Components/TwelveMonths';
import Homepage from './pages/Homepage';
import MonthView from './pages/MonthView';
import DetailedDayView from './pages/DetailedDayView';

function App() {
  // const [serverData, setServerData] = useState("");

  // useEffect(() => {
  //   async function getServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   getServerData();
  // }, []);

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
              <Route path=':date' element={<DetailedDayView />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
