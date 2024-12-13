import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getOrdersCountByDayApi } from "../../../apis/order";

const TotalSellsChart = () => {
    const [series, setSeries] = useState([
        {
            name: "Tuần hiện tại",
            data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: "Tuần trước đó",
            data: [0, 0, 0, 0, 0, 0, 0],
        },
    ]);
    const [maxCount, setMaxCount] = useState(10);

    const options = {
        chart: {
            height: 350,
            type: "line",
            dropShadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2,
            },
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        title: {
            text: "Thống kê số đơn hàng trong tuần",
            align: "left",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
            },
        },
        markers: {
            size: 1,
        },
        xaxis: {
            categories: ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"],
            title: {
                text: "Ngày trong tuần",
            },
        },
        yaxis: {
            min: 0,
            max: maxCount,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };

    useEffect(() => {
        (async () => {
            const response = await getOrdersCountByDayApi();
            console.log(response);
            if (!response.error) {
                const currentWeekData = Array(7).fill(0);
                response.data.currentWeekOrders.forEach((order) => {
                    currentWeekData[order._id - 1] = order.count;
                });
                if (maxCount < Math.max(...currentWeekData)) {
                    setMaxCount(Math.max(...currentWeekData));
                }

                const lastWeekData = Array(7).fill(0);
                response.data.lastWeekOrders.forEach((order) => {
                    lastWeekData[order._id - 1] = order.count;
                });
                if (maxCount < Math.max(...lastWeekData)) {
                    setMaxCount(Math.max(...lastWeekData));
                }

                setSeries([
                    {
                        name: "Tuần hiện tại",
                        data: currentWeekData,
                    },
                    {
                        name: "Tuần trước đó",
                        data: lastWeekData,
                    },
                ]);
            }
        })();
    }, []);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default TotalSellsChart;
