import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = () => {
    const [series, setSeries] = useState([44, 55, 13, 33]);
    const options = {
        chart: {
            width: 540,
            type: "donut",
        },
        dataLabels: {
            enabled: false,
        },
        labels: ["Đang chuẩn bị hàng", "Đang giao hàng", "Đang xác minh", "Bị hủy"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
        legend: {
            position: "right",
            offsetY: 0,
            height: 230,
        },
    };

    const appendData = () => {
        setSeries((prevSeries) => [...prevSeries, Math.floor(Math.random() * 100) + 1]);
    };

    const removeData = () => {
        setSeries((prevSeries) => (prevSeries.length > 1 ? prevSeries.slice(0, -1) : prevSeries));
    };

    const randomize = () => {
        setSeries((prevSeries) => prevSeries.map(() => Math.floor(Math.random() * 100) + 1));
    };

    const reset = () => {
        setSeries([44, 55, 13, 33]);
    };

    return (
        <div>
            <div>
                <div className="chart-wrap">
                    <div id="chart">
                        <ReactApexChart options={options} series={series} type="donut" width={540} />
                    </div>
                </div>

                {/* <div className="actions flex justify-between">
                    <button onClick={appendData}>+ Thêm </button>
                    <button onClick={removeData}>- Xóa bớt</button>
                    <button onClick={randomize}>Ngẫu nhiên </button>
                    <button onClick={reset}>Quay lại</button>
                </div> */}
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default DonutChart;
