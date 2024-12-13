import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const XAXISRANGE = 777600000;
let lastDate = new Date().getTime();

// Generate initial data
function generateInitialData() {
    const series = [];
    let baseVal = lastDate - XAXISRANGE;
    for (let i = 0; i < 10; i++) {
        series.push([baseVal, Math.floor(Math.random() * (90 - 10 + 1)) + 10]);
        baseVal += 86400000; // Increment by one day
    }
    return series;
}

const data = generateInitialData();

const MonthChart = () => {
    const [series] = useState([{ data }]);

    const [options] = useState({
        chart: {
            id: "static",
            height: 350,
            type: "line",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        markers: {
            size: 0,
        },
        xaxis: {
            type: "datetime",
            labels: {
                formatter: function (value) {
                    const date = new Date(value);
                    return `${date.getDate()}`;
                },
            },
        },
        yaxis: {
            max: 100,
        },
        legend: {
            show: false,
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default MonthChart;
