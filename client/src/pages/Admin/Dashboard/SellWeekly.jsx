import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
    const [series] = useState([
        {
            name: "Tăng lên",
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2],
        },
    ]);

    const [options] = useState({
        chart: {
            height: 350,
            type: "bar",
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
                dataLabels: {
                    position: "top", // top, center, bottom
                },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + "%";
            },
            offsetY: -20,
            style: {
                fontSize: "12px",
                colors: ["#304758"],
            },
        },
        xaxis: {
            categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5 ", "Thứ 6", "Thứ 7", "Chủ nhật"],
            position: "top",
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                fill: {
                    type: "gradient",
                    gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val + "%";
                },
            },
        },
        title: {
            text: "",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
                color: "#444",
            },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default ApexChart;
