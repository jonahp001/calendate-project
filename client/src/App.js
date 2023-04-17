import { useEffect, useState } from 'react';
import './App.css';
import CalendarComponent from './CalendarComponent.js';
import CurrentDate from './CurrentDate';
import Navbar from './Navbar';
import CalendarIcon from './CalendarIcon';
// import TwelveMonths from './TwelveMonths';


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
    <div className="App">
      <Navbar />
      <div className="container">
        <CurrentDate />
        {/* <TwelveMonths /> */}
        <CalendarComponent />
        <CalendarIcon />
        <h1>{serverData}</h1>
      </div>
    </div>
  );
}

export default App;
