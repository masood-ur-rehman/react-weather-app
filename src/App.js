import React, { useEffect,useState } from "react";
import Header from "./components/Header";
import Result from "./components/Result";
import Search from "./components/Search";

const API_URL = "http://weather-app.mphp.net/weather.php?command=location&woeid=";


const App = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

   useEffect(() => {
     setLoading(false);
   }, []);

  const search = searchValue => {
    if(searchValue==''){
      return;
    }
    setLoading(true);
    setErrorMessage(null);

    fetch(`${API_URL}${searchValue}`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse) {
            setResults(
                [jsonResponse]
                );
            setLoading(false);
          } else {
            setErrorMessage('Error');
            setLoading(false);
          }
        });
  };

  return (
      <div className="App">
        <Header text="Search" />
        <Search search={search} />
        <p className="App-intro">Search By Woeid ID like 44418, 2344116, 638242</p>
        <div className="results">
          {loading && !errorMessage ? (
              <span>loading...</span>
          ) : errorMessage ? (
              <div className="errorMessage">{errorMessage}</div>
          ) : (
              results.map((res, index) => (
                    <Result key={`${index}-${res.title}`} res={res}  />
              ))
          )}
        </div>
      </div>
  );
};


export default App;