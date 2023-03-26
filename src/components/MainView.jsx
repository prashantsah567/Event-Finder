import React, {useState, useEffect} from 'react';
import './Style.css';

const MainView = () =>{

    const [eventData, setEventData] = useState([]);

    async function fetchData() {
        const response = await fetch("https://api.seatgeek.com/2/events?per_page=100&client_id=MzI2MTYwNzR8MTY3OTY5OTg2MS45ODAwMDAz")
        const data = await response.json()
        console.log(data);
        setEventData(data.events);
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div>
      <h1 className='header'>Explore Events Around You</h1>
      <hr/>
        <div className='search'>
            <input placeholder='search by name of event'/> <button>Search</button>
        </div>
        <div className='filter'>
            <p>First filter - State</p> 
            <p>Second filter - Date</p>
            <p>Third filter - Capacity</p>
        </div>
      <hr/>
      <div className='container'>
            {eventData.map(event => (
                <div className='card'>
                    <p key={event.id}>
                        <strong>{event.title}</strong>
                    </p>
                    <p>
                        Event Type: <span>{event.type},</span>
                        Start Time (UTC): <span>{event.datetime_utc},</span>
                        End Time (UTC): <span>{(event.enddatetime_utc)?(event.enddatetime_utc):'N/A'}</span>
                    </p>
                    <p>
                        <span>{event.venue.address},</span>
                        <span>{event.venue.city},</span>
                        <span>{event.venue.country},</span>
                        Capacity:<span>{(event.venue.capacity) > 0 ? (event.venue.capacity):'N/A'}</span>
                    </p>
                </div>
            ))}
      </div>
    </div>
  );
}

export default MainView;