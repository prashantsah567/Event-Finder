import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './Style.css';
import States from './States';
import BarChartVisual from './BarChartVisual';
import PieChartVisual from './PieChartVisual';

const MainView = () =>{

    const [eventsData, setEventsData] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [stateFilter, setStateFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [capacity, setCapacity] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    if(!eventsData){
        return <div>Loading...</div>
    }

    async function fetchData() {
        const response = await fetch("https://api.seatgeek.com/2/events?per_page=100&client_id=MzI2MTYwNzR8MTY3OTY5OTg2MS45ODAwMDAz")
        const data = await response.json();
        setEventsData(data.events);
        setFilteredEvents(data.events);
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(eventsData);

    //extract state names and count events for each state
    const stateData = eventsData?.reduce((acc, curr) => {
        const stateName = curr.venue.state;
        if(stateName){
            if(!acc[stateName]){
                acc[stateName] = 0;
            }
            acc[stateName]++;
        }
        return acc;
    },{});

    //convert stateData to an array of objects for use in BarChartVisual component
    const chartData = Object.keys(stateData || {}).map((key) => ({
        state: key,
        events: stateData[key],
    }));

    //for the data of Pie-Chart we need to store eventType and numberOfEvent as count
    const eventTypeData = eventsData?.reduce((acc, curr) => {
        const eventType = curr.type;
        if(eventType){
            if(!acc[eventType]){
                acc[eventType] = 0;
            }
            acc[eventType]++;
        }
        return acc;
    },{});

    //now we convert the eventType data to array of Objects to pass it to BarChartVisual component
    const pieChartData = Object.keys(eventTypeData || {}).map((key) => ({
        eventType: key,
        count: eventTypeData[key],
    }))
    
    //another useEffect hook to handle multiple filters
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

        //apply capacity filter
        if(capacity == 1000){
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => (event.venue.capacity <= capacity) && (event.venue.capacity != '')));
        }else if(capacity == 2000){
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => (event.venue.capacity <= capacity) && (event.venue.capacity != '')));
        }else if(capacity == 5000){
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => (event.venue.capacity <= capacity) && (event.venue.capacity != '')));
        }else if(capacity == 10000){
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => (event.venue.capacity <= capacity) && (event.venue.capacity != '')));
        }else if(capacity == 10001){
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => (event.venue.capacity >= capacity) && (event.venue.capacity != '')));
        }

        //apply the date filter
        if(selectedDate != ''){
            setFilteredEvents((prevEvents) => prevEvents.filter((event) => (new Date(event.datetime_local).toISOString().substring(0,10) == selectedDate)));
        }
           
    }, [eventsData, stateFilter, searchQuery, capacity, selectedDate]);

    const handleStateFilter = (event) =>{
        setStateFilter(event.target.value);
    }

    const handleSearchQuery = (event) =>{
        setSearchQuery(event.target.value);
    }

    const handleCapacity = (event) =>{
        setCapacity(event.target.value);
    }

    const handleDateChange = (event) =>{
        setSelectedDate(event.target.value);
    }

    

  return (
    <div className='mainContainer'>
        <div className='container1'>
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
                    <p>
                        Search by Date: <input type="date" value={selectedDate} onChange={handleDateChange} />
                    </p>
                    <p>
                        <label>Filter by Capacity: </label>
                        <select onChange={handleCapacity}>
                            <option value="">All</option>
                            <option value="1000">Less than 1,000</option>
                            <option value="2000">Less than 2,000</option>
                            <option value="5000">Less than 5,000</option>
                            <option value="10000">Less than 10,000</option>
                            <option value="10001">More than 10,000</option>
                        </select>
                    </p>
                </div>
            <hr/>
            <div className='container'>
                    {filteredEvents.map(event => (
                        <div className='card'>
                            <p key={event.id}>
                                <strong>{event.title}</strong>
                                <Link to={`/detail/${event.id}`} className='details'>🔗</Link>
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
        <div className='container2'>
            <div className="barChart">
                <BarChartVisual chartData={chartData}/>
            </div>
            <div className="pieChart">
                <PieChartVisual pieChartData={pieChartData}/>
            </div>
        </div>
    </div>

  );
}

export default MainView;