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
        <div>
            <h1>Detail Page</h1>
            <p>Additional data for card {id}</p>
            <p>{item.short_title}</p>
            <p>{item.venue.address}</p>
        </div>
    )
}

export default DetailPage;