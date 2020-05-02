import React from "react";
import {BrowserRouter as Router, Link, Switch, Route, useParams} from "react-router-dom";

class App extends React.Component {


    state = {
        isLoading: true,
        users: [],
        detail_weather: [],
        cities: [],
        error: null,
    };

    fetchTemp() {

        const cities = [
            {"title":"Istanbul","location_type":"City","woeid":2344116,"latt_long":"41.040852,28.986179"},
            {"title":"Berlin","location_type":"City","woeid":638242,"latt_long":"52.516071,13.376980"},
            {"title":"London","location_type":"City","woeid":44418,"latt_long":"51.506321,-0.12714"},
            {"title":"Helsinki","location_type":"City","woeid":565346,"latt_long":"60.171162,24.932581"},
            {"title":"Dublin","location_type":"City","woeid":560743,"latt_long":"53.343761,-6.249530"},
            {"title":"Vancouver","location_type":"City","woeid":9807,"latt_long":"49.267239,-123.145264"}
        ];

        let i=0;
        for(i;i< cities.length;i++) {
            fetch(`http://weather-app.mphp.net/weather.php?command=location&woeid=`+cities[i].woeid)
                .then(response => response.json())
                .then(data =>
                    this.setState({
                        cities: this.state.cities.concat(data),
                        isLoading: false,
                    }),
                )
                .catch(error => this.setState({error, isLoading: false}));

        }
    }


    componentDidMount() {
        this.fetchTemp();
    }


    render() {
        const {isLoading, cities, error} = this.state;

        return (
            <React.Fragment>
                <h1>Temperature List</h1>
                {error ? <p>{error.message}</p> : null}
                {!isLoading ? (

                    cities.map(city => {
                        const {title, location_type, woeid, consolidated_weather} = city;
                        let image = 'https://www.metaweather.com/static/img/weather/'+consolidated_weather[0].weather_state_abbr+'.svg';
                        let detail = '/weather/'+woeid;

                        return (

                            <div key={woeid}>
                                <p>City Name: {title} - {location_type}</p>
                                <p>Temperature: {consolidated_weather[0].the_temp}</p>
                                <p>Maximum: {consolidated_weather[0].max_temp}</p>
                                <p>Minimum: {consolidated_weather[0].min_temp}</p>
                                Status: <img src={image} alt="" style={{width: 32}}/>
                                <p>Action: {woeid}</p>
                                <Router>
                                    <Link to={detail} >View</Link>
                                    <Switch>
                                        <Route path="/weather/:id" children={<Child />} >
                                            <Child consolidated_weather={consolidated_weather[0]} />
                                        </Route>
                                    </Switch>
                                </Router>
                                <hr/>
                            </div>
                        )
                    })
                ) : (
                    <h3>Loading...</h3>
                )}
            </React.Fragment>
        );
    }
}

function Child({ consolidated_weather }) {

    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { id } = useParams();
    console.log(consolidated_weather);
    return (
        <React.Fragment>

            <div>
                <h3>Woeid: {id}</h3>
                <h3>Weather State: {consolidated_weather.weather_state_name}</h3>
                <h3>Wind Direction: {consolidated_weather.wind_direction_compass}</h3>
                <h3>Date: {consolidated_weather.applicable_date}</h3>
                <h3>Humidity: {consolidated_weather.humidity}</h3>

            </div>
        </React.Fragment>
    );
}
export default App;