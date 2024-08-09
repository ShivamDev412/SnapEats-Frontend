import { useEffect, useRef } from 'react';
import { useGetOrderStatsQuery } from "@/redux/slice/api/store/dashboardSlice";
import Chart from 'chart.js/auto';

const OrderStatsSection = () => {
  const { data: orderStatus, isLoading } = useGetOrderStatsQuery();
  const chartRef = useRef(null);
  const { lastWeekOrders, lastMonthOrders, lastThreeMonthsOrders, lastSixMonthsOrders, lastYearOrders } = orderStatus?.data || {};

  useEffect(() => {
    if (!chartRef.current || !orderStatus) return;

    const chartInstance = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: ["Last Week", "Last Month", "Last 3 Months", "Last 6 Months", "Last Year"],
        datasets: [
          {
            label: "Number of Orders",
            data: [lastWeekOrders, lastMonthOrders, lastThreeMonthsOrders, lastSixMonthsOrders, lastYearOrders],
            backgroundColor: [
              "rgba(54, 162, 235, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Order Statistics',
            color: 'white',
            font: {
              size: 24,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          y: {
            ticks: {
              color: 'white',
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [orderStatus, lastWeekOrders, lastMonthOrders, lastThreeMonthsOrders, lastSixMonthsOrders, lastYearOrders]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="w-1/2">
      <canvas ref={chartRef}></canvas>
    </section>
  );
};

export default OrderStatsSection;
