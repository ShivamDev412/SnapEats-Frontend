import { useGetRevenueTrendsQuery } from "@/redux/slice/api/store/dashboardSlice";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment-timezone";

const RevenueTrendsSection = () => {
  const { data: revenueTrends, isLoading } = useGetRevenueTrendsQuery();
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !revenueTrends) return;

    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: revenueTrends?.data?.map((entry) => moment(entry.date).format("MMM DD")),
        datasets: [
          {
            label: "Revenue",
            data: revenueTrends?.data?.map((entry) => entry.revenue.toFixed(2)),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)", 
            borderWidth: 2,
            fill: true,
            tension: 0.4,
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
            text: "Revenue Trends (Last 30 Days)",
            color: "white",
            font: {
              size: 24,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [revenueTrends]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/2 p-4 bg-zinc-900 rounded-lg shadow-md">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default RevenueTrendsSection;
