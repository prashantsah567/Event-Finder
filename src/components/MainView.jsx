import React, {useState, useEffect} from 'react';
import './Style.css';

const MainView = () =>{

    const [titles, setTitles] = useState([]);

    async function fetchData() {
        const response = await fetch("https://api.seatgeek.com/2/events?client_id=MzI2MTYwNzR8MTY3OTY5OTg2MS45ODAwMDAz")
        const data = await response.json()
        const titleList = data.events.map(event => event.title);
        setTitles(titleList);
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div>
      <h1>List of Titles:</h1>
      <ul>
        {titles.map(title => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </div>
  );
}

export default MainView;