import { useEffect, useState } from 'react';
import './App.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


function App() {
  const [serverData, setServerData] = useState("");
  const [value, onChange] = useState(new Date());

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
      <header className="App-header">
        <Calendar onChange={onChange} value={value} />
        <h1>{serverData}</h1>
      </header>
    </div>
  );
}

export default App;
