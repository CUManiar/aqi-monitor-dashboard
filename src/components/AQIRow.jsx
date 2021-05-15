import React from "react";
import TimeAgo from "react-timeago";

const AQIRow = ({ city, cityData, toggleCitySelection }) => {
  let history = cityData.history;
  const getCityValueColor = (city) => {
    if (city.currentValue <= 50) {
      return "green";
    } else if (city.currentValue > 50 && city.currentValue <= 100) {
      return "yellowgreen";
    } else if (city.currentValue > 100 && city.currentValue <= 200) {
      return "yellow";
    } else if (city.currentValue > 200 && city.currentValue <= 300) {
      return "orange";
    } else if (city.currentValue > 300 && city.currentValue <= 400) {
      return "red";
    } else {
      return "brown";
    }
  };
  return (
    <tr
      className={cityData.is_selected ? "selected" : null}
      id={city}
      onClick={() => toggleCitySelection(city)}
    >
      <td>{city.toUpperCase()}</td>
      <td className={getCityValueColor(cityData)}>
        {/* {cityData.currentValue.toFixed(2)} */}
        { cityData.currentValue && parseFloat(cityData.currentValue).toFixed(2)}
      </td>
      <td className="updated_at">
        <TimeAgo date={history.slice(-1)[0].time} />
      </td>
    </tr>
  );
};

export default AQIRow;
