import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useGetOrderStatsQuery } from "@/redux/slice/api/store/dashboardSlice";
import { ChartSkeleton } from "../Skeleton/StoreDashboardSkeleton";

const MostOrderedItem = () => {
  const chartRef = useRef(null);
  const { data: orderStatus, isLoading } = useGetOrderStatsQuery();
  const { mostOrderedItems: items } = orderStatus?.data || {};
  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: items?.map((item) => item.name),
        datasets: [
          {
            label: "Number of Orders",
            data: items?.map((item) => item.quantity),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
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
            text: "Most Ordered Items",
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
              stepSize: 1,
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
  }, [items]);
  if (isLoading) return <ChartSkeleton />;
  return (
    <div className="w-1/2">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MostOrderedItem;
