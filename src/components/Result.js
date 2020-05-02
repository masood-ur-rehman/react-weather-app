import React from "react";

const Result = ({ res }) => {
    return (
        <div className="movie">
            <h2>{res.title}</h2>
            <h5>Status: {res.consolidated_weather[0].weather_state_name}</h5>
            <h5>Temp: {res.consolidated_weather[0].the_temp}</h5>
            <h5>Max: {res.consolidated_weather[0].max_temp}</h5>
            <h5>Min: {res.consolidated_weather[0].min_temp}</h5>
        </div>
    );
};

export default Result;