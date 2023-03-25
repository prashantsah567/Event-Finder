import React, {useState, useEffect} from 'react';
import './Style.css';

const MainView = () =>{

    const [data, setData] = useState([]);

    const url = `https://api.seatgeek.com/2/events?client_id=MzI2MTYwNzR8MTY3OTY5OTg2MS45ODAwMDAz`;
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${url}`);
            const jsonData = await response.json();
            setData(jsonData);
        }
        fetchData();
    }, []);
    
    return(
        <div>
            <div className='container'>
                <p>Data from the API call</p>
                <p></p>
                {/* {
                    data.map(event => (
                        <div key={event.id}>
                            <p>{event.events[1].title}</p>
                        </div>
                    ))
                } */}
            
                {
                    <p>{data.events[0].title}</p>
                }
                
                {
                    console.log(data)
                }
            </div>
        </div>
    );
}

export default MainView;