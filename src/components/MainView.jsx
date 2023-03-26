import React, {useState, useEffect} from 'react';
import './Style.css';
import States from './States';

const MainView = () =>{

    const [eventsData, setEventsData] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [stateFilter, setStateFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    async function fetchData() {
        const response = await fetch("https://api.seatgeek.com/2/events?per_page=100&client_id=MzI2MTYwNzR8MTY3OTY5OTg2MS45ODAwMDAz")
        const data = await response.json()
        console.log(data);
        setEventsData(data.events);
        setFilteredEvents(data.events);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // function handleStateFilter(event){
    //     setSelectedState(event.target.value);
    // }

    // const filteredEvents = selectedState
    // ? events.filter((event) => event.venue.state === selectedState)
    // : events;
    //to handle the state change

    //another useEffect to filters
    useEffect(()=>{

        //apply state filter
        if(stateFilter != ""){
            setFilteredEvents(eventsData);//to set the filteredEvents to original events data
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => event.venue.state === stateFilter));
        }else{
            setFilteredEvents(eventsData);
        }

        //apply search filter
        if(searchQuery !== ""){
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase())));
        }
    }, [eventsData, stateFilter, searchQuery]);

    const handleStateFilter = (event) =>{
        setStateFilter(event.target.value);
    }

    const handleSearchQuery = (event) =>{
        setSearchQuery(event.target.value);
    }

    // const handleSearch = (event) =>{
    //     event.preventDefault();
    //     //apply search filter
    //     setFilteredEvents((prevEvents) => prevEvents.filter((event) => event.title.toLowerCase().includes(searchQuery.toLowerCase())));
    // }

    // const handleStateChange = (event) => {
    //     setSelectedState(event.target.value);
    //     //filter state based on selected state
    //     if(event.target.value != ""){
    //         const filteredByState = selectedState
    //         ? events.filter((event) => event.venue.state === selectedState): events;
    //         setFilteredEvents(filteredByState);
    //     }
    //     //else{
    //     //     setFilteredEvents(events);
    //     // }
    // }

    // // to handle the search
    // const handleSearch = (event) =>{
    //     setSearchTerm(event.target.value);

    //     //filter the event based on search term
    //     const filtered = events.filter((event) => 
    //     event.title.toLowerCase().includes(event.target.value.toLowerCase()));
    //     setFilteredEvents(filtered);
    // }

  return (
    <div>
      <h1 className='header'>Explore Events Around You</h1>
      <hr/>
        <div className='search'>
                <input id="search-query" type="text" value={searchQuery} onChange={handleSearchQuery} placeholder='search by name of event'/>
        </div>
        <div className='filter'>
            <p>
                <label htmlFor="state-filter">Filter by state: </label>
                <select id="state-filter" onChange={handleStateFilter}>
                    <option value="">All</option>
                    {
                        States.map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))
                    }
                </select>
            </p>
            <p>Second filter - Date</p>
            <p>Third filter - Capacity</p>
        </div>
      <hr/>
      <div className='container'>
            {filteredEvents.map(event => (
                <div className='card'>
                    <p key={event.id}>
                        <strong>{event.title}</strong>
                    </p>
                    <p>
                        Event Type: <span>{event.type},</span>
                        Start Time (UTC): <span>{new Date(event.datetime_utc).toLocaleString()},</span>
                        End Time (UTC): <span>{(event.enddatetime_utc)?(new Date(event.enddatetime_utc).toLocaleString()):'N/A'}</span>
                    </p>
                    <p>
                        <span>{event.venue.address},</span>
                        <span>{event.venue.city},</span>
                        <span>{event.venue.state},</span>
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