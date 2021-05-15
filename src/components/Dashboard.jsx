import React, { useState, useEffect, useReducer } from "react";
import * as bulma from "reactbulma";
import AQITable from "./AQITable.jsx";
import AQIGraph from "./AQIGraph";
import LoaderStatus from "./LoaderStatus.jsx";

const cityURL = "ws://city-ws.herokuapp.com/";

const Dashboard = ({ showSpinner, hideSpinner }) => {
  const [connectionError, setConnectionError] = useState(false);
  const [cities, setCities] = useState({});

  useEffect(() => {
    const connection = new WebSocket(cityURL);
    connection.onmessage = (e) => saveNewCityValues(e);
    connection.onclose = () => setConnectionError(true);
    return () => {
      connection.close();
    };
  });

  const saveNewCityValues = (e) => {
    hideSpinner();
    let result = JSON.parse(e.data);
    let [upValueCount, downValueCount] = [0, 0];

    let currentTime = Date.now();
    let newCities = cities;
    result.forEach(({ city, aqi }) => {
      if (cities[city]) {
        newCities[city].currentValue > Number(aqi)
          ? upValueCount++
          : downValueCount++;

        newCities[city].currentValue = Number(aqi);
        newCities[city].history.push({ time: currentTime, value: Number(aqi) });
      } else {
        newCities[city] = {
          currentValue: aqi,
          history: [{ time: Date.now(), value: Number(aqi) }],
          isSelected: false,
        };
      }
    });
    setCities(JSON.parse(JSON.stringify(newCities)));
  };

  const toggleCitySelection = (city) => {
    let newCities = cities;
    newCities[city].isSelected = !newCities[city].isSelected;
    setCities(newCities);
  };

  const resetData = () => {
    let newCities = cities;
    Object.keys(cities).forEach((city, index) => {
      newCities[city].history = [newCities[city].history.pop()];
      setCities(JSON.parse(JSON.stringify(newCities)));
    });
  };

  const areCitiesLoaded = () => {
    return Object.keys(cities).length > 0;
  };

  return (
    <div className="container">
      <div className="columns">
        <AQITable
          cityList={cities}
          toggleCitySelection={toggleCitySelection}
          resetData={resetData}
          areCitiesLoaded={areCitiesLoaded}
        />
        <AQIGraph cityData={cities} />
      </div>
      <div className={showSpinner ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <LoaderStatus connectionError={connectionError} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
