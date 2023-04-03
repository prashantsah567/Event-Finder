import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () =>{
    const {id} = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () =>{
        try{
            const response = await fetch(`https://api.seatgeek.com/2/events/${id}?per_page=100&client_id=MzI2MTYwNzR8MTY3OTY5OTg2MS45ODAwMDAz`);
            const data = await response.json();
            setItem(data);
        } catch(error){
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
      }, [id]);

      console.log(item);
      
      if(error){
        return <div>Error: {error.message}</div>
      }
      if(!item){
        return <div>Loading...</div>
      }

    //here will be the data from the id we get as a parameter in the URL
    return(
        <div className='container'>
            <div className='box'>
                <h1>{item.short_title}</h1>
                <p></p>
                <div className='content'>
                    Event Type: <span>{item.type}</span>,
                    Event Date: <span>{new Date(item.datetime_utc).toLocaleString()}</span>
                    <p></p>
                    Address: <span>{item.venue.address}</span>,
                    City: <span>{item.venue.city}</span>,
                    Zip Code: <span>{item.venue.postal_code}</span>
                    <p></p>
                    Venue: <span>{item.venue.name}</span>
                    <p></p>
                    Capacity: <span>{item.venue.capacity}</span>
                    <p></p>
                    
                    Performer: <span>{item.performers[0].name}</span>
                    {/* {item.performers.map(performer => {
                        <span>{performer.name}</span>
                    })} */}
                </div>
            </div>
        </div>
    )
}

export default DetailPage;