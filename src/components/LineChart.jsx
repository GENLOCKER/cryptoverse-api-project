// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Col, Row, Typography } from "antd";
// import Chart from "chart.js/auto";

// const { Title } = Typography;

// const LineChart = ({ coinHistory, currentPrice, coinName }) => {
//   const coinPrice = [];
//   const coinTimestamp = [];

//   // Extract prices and timestamps from coinHistory
//   for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
//     coinPrice.push(coinHistory?.data?.history[i].price);
//     coinTimestamp.push(
//       new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
//     );
//   }

//   console.log(coinPrice);
//   console.log(coinTimestamp);

//   const data = {
//     labels: coinTimestamp, // categorical data (dates)
//     datasets: [
//       {
//         label: "Price In USD",
//         data: coinPrice, // numerical data (prices)
//         fill: false,
//         backgroundColor: "#0071bd",
//         borderColor: "#0071bd",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         // 'y' instead of 'yAxes'
//         beginAtZero: true,
//       },
//       x: {
//         // 'x' instead of 'xAxes'
//         type: "category", // Ensure x-axis is treated as categorical
//       },
//     },
//   };

//   return (
//     <>
//       <Row className="chart-header">
//         <Title level={2} className="chart-title">
//           {coinName} Price Chart
//         </Title>
//         <Col className="price-container">
//           <Title level={5} className="price-change">
//             Change: {coinHistory?.data?.change}%
//           </Title>
//           <Title level={5} className="current-price">
//             Current {coinName} Price: $ {currentPrice}
//           </Title>
//         </Col>
//       </Row>
//       <Line data={data} options={options} />
//     </>
//   );
// };

// export default LineChart;
import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // Ensure coinHistory is defined and has the expected structure
  if (coinHistory?.data?.history?.length) {
    for (let i = 0; i < coinHistory.data.history.length; i += 1) {
      coinPrice.push(coinHistory.data.history[i].price);
      coinTimestamp.push(
        new Date(
          coinHistory.data.history[i].timestamp * 1000
        ).toLocaleDateString() // Ensure timestamp is in milliseconds
      );
    }
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  console.log(coinTimestamp);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: ${currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
