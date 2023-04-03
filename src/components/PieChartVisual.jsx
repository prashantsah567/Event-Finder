import React from "react";
import {PieChart, Pie, Cell, Tooltip} from "recharts";
import './BarChartVisual.css';

const PieChartVisual = ({pieChartData}) => {
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#af19ff', '#00FF7F', '#8884d8', '#FFC300', '#FF5733', '#03A9F4'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = 5 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text x={x} y={y} fill="#8884d8" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
            {`${pieChartData[index].eventType} (${(percent * 100).toFixed(0)}%)`}
          </text>
        );
      };
      {console.log(pieChartData)}
    return(
        <div>
            <h3 className='bar-header'>Pie Chart Showing Event Types by Percentage and Numbers</h3>
            <PieChart width={700} height={700}>
                <Pie 
                data={pieChartData} 
                dataKey="count"
                nameKey="eventType"
                cx={300} 
                cy={200} 
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={180} 
                fill="#8884d8">
                    {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[Math.floor(Math.random() * COLORS.length)]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}`}/>
            </PieChart>
        </div>
    )
}

export default PieChartVisual;