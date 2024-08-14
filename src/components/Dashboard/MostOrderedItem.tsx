import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useGetOrderStatsQuery } from "@/redux/slice/api/store/dashboardSlice";

const MostOrderedItem = () => {
  const chartRef = useRef(null);
  const { data: orderStatus, isLoading } = useGetOrderStatsQuery();
  const { mostOrderedItems: items } = orderStatus?.data || {};

  useEffect(() => {
    if (!chartRef.current || !items) return;

    const chartInstance = new Chart(chartRef.current, {
      type: "doughnut",
      data: {
        labels: items?.map((item) => item.name),
        datasets: [
          {
            label: "Number of Orders",
            data: items?.map((item) => item.quantity),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
            ], 
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ], 
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, 
            position: 'top', 
            labels: {
              color: 'white',
            },
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
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [items]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-1/2 h-[5in]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MostOrderedItem;
