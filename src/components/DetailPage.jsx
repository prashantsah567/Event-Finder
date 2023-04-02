import React from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = () =>{
    const {id} = useParams();

    //here will be the data from the id we get as a parameter in the URL

    return(
        <div>
            <h1>Detail Page</h1>
            <p>Additional data for card {id}</p>
        </div>
    )
}

export default DetailPage;