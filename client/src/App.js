import { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import './App.css';
import CalendarComponent from './Components/CalendarComponent';
import CurrentDate from './Components/CurrentDate';
import Navbar from './Components/Navbar';
import CalendarIcon from './Components/CalendarIcon';
import TwelveMonths from './Components/TwelveMonths';

import MonthView from './pages/MonthView';

function App() {
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    async function getServerData() {
      const resp = await fetch('/api/hello');
      const data = await resp.json();

      console.log('Data from server:', data);

      setServerData(data.message);
    }

    getServerData();
  }, []);

  return (
    <div className='App'>
      <Navbar />
      <CurrentDate />
      <Routes>
        <Route path='/month' element={<MonthView />}/>
        <Route path='/year'>
          <Route index element={<TwelveMonths />} />
          <Route path=':yearAndMonth' element={<MonthView />} />
        </Route>
      </Routes>
      <h1>{serverData}</h1>
    </div>
  );
}

export default App;
