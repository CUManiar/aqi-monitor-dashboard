import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { chartJsConfig, chartColors, chartDataset } from "../chartConfig.js";

const AQIGraph = ({ cityData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    updateChart();
  }, [cityData]);

  const getCityValues = (city) => {
    return city.history.map((history) => {
      return { t: new Date(history.time), y: history.value };
    });
  };

  const updateChart = () => {
    let chart = chartRef.current.chartInstance;

    if (Object.keys(cityData).length === 0) {
      chart['data']['datasets'] = [];
      return chart.update();
    }

    Object.keys(cityData).map((city, index) => {
      let currentCity = cityData[city];
      let chartDataSet = chart.data.datasets.find((dataset) => {
        return dataset.label === city.toUpperCase();
      });

      if (currentCity.isSelected) {
        let currentCity = cityData[city];
        if (chartDataSet) {
          // only update the data, don't create a new dataset for the graph
          chartDataSet.data = getCityValues(currentCity);
        } else {
          // create a new dataset for graph
          if (currentCity) {
            chart.data.datasets = chart.data.datasets.concat([
              chartDataset(
                city,
                chartColors[index],
                getCityValues(currentCity)
              ),
            ]);
          }
        }
      } else {
        if (chartDataSet) {
          // remove the dataset from graph
          chart.data.datasets.splice(
            chart.data.datasets.indexOf(chartDataSet),
            1
          );
        }
      }
      chart.update();
    });
  };

  return (
    <div className={"card column"}>
      <div className="card-header">
        <div className="card-header-title">Graph</div>
      </div>
      <div className="card-content">
        <p className="is-size-7 has-text-info">
          {chartRef && chartRef.current?.chartInstance?.data.datasets.length > 0
            ? "Scroll/pinch to zoom, drag to pan."
            : "Click on any city on your left to see graphs."}
        </p>
        <Line ref={chartRef} data={{ datasets: [] }} options={chartJsConfig} />
      </div>
    </div>
  );
};

export default AQIGraph;
