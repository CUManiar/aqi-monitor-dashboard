import React from "react";
import { Detector } from "react-detect-offline";
import AQIRow from "./AQIRow";

const AQITable = ({
  cityList,
  toggleCitySelection,
  resetData,
  areCitiesLoaded,
}) => {
  return (
    <div className="card column is-one-third" id="city_list">
      <div className="card-header">
        <div className="card-header-title">
          Cities &nbsp;
          <Detector
            render={({ online }) => (
              <span className={online ? "tag is-success" : "tag is-danger"}>
                {online ? "Live" : "Offline"}
              </span>
            )}
          />
          &nbsp;
          <button className="button is-small" onClick={resetData}>
            Clear history
          </button>
        </div>
      </div>
      <div className="card-content">
        {areCitiesLoaded() ? (
          <p className="is-size-7 has-text-info">
            Click on a City to select/unselect
          </p>
        ) : null}
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>City</th>
              <th>AQI</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(cityList).map((city, id) =>  (
                <AQIRow
                  key={id}
                  city={city}
                  cityData={cityList[city]}
                  toggleCitySelection={toggleCitySelection}
                />
            )
            )}
            {areCitiesLoaded() ? null : (
              <tr>
                <td colSpan="4">No Cities loaded yet!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AQITable;
