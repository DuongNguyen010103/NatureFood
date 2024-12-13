import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const LifeChart = () => {
    const [series] = useState([
        {
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
    ]);

    const [options] = useState({
        chart: {
            height: 350,
            type: "line",
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "straight",
        },
        title: {
            text: "",
            align: "left",
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
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

export default LifeChart;
