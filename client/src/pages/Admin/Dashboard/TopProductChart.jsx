import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopProductChart = () => {
    const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0", "#546E7A"];

    const [series] = useState([
        {
            data: [21, 22, 10, 28, 16, 21],
        },
    ]);

    const options = {
        chart: {
            height: 350,
            type: "bar",
            width: "100%",
            events: {
                click: function (chart, w, e) {
                    // console.log(chart, w, e)
                },
            },
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: "40%",
                distributed: true,
                width: "100%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        xaxis: {
            categories: [["Gia vị"], ["Giấm trái cây"], ["Nước cốt"], ["Thạch thảo mộc"], ["Thực phẩm làm đẹp"], ["Nước lẩu"]],
            labels: {
                style: {
                    colors: colors,
                    fontSize: "12px",
                },
            },
        },
    };

    return (
        <div style={{ width: "100%", maxWidth: "1500px", margin: "0 auto" }}>
            {" "}
            <div id="chart">
                <ReactApexChart options={options} series={series} type="bar" height={340} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default TopProductChart;
