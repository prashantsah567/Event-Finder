import React from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList} from 'recharts';
import './LeftVisual.css';

const LeftVisual = ({chartData}) =>{
    
    return(
        <div className='left-visual'>
            <h3 className='bar-header'>Bar Chart Showing Number of Events in Each State</h3>
            <BarChart width={700} height={400} data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="events" fill="#8884d8">
                    <LabelList dataKey="state" position="bottom" offset={5} style={{ fontSize: '8px' }}/>
                </Bar>
            </BarChart>
        </div>
    )
}

export default LeftVisual;