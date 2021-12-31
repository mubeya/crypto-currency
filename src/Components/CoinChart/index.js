import { useState, useEffect } from "react";
import axios from "axios";
import style from "./style.module.css";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; //adding for console error about chart.js version dont delete this

function CoinChart({ coin_id }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let isCancelled = false;

    const fetchCoinChart = async () => {
      await axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coin_id}/market_chart/range?vs_currency=usd&from=1640563200&to=1640612120`
        )
        .then((res) => {
          if (!isCancelled) {
            setChartData(res.data.prices);
          }
        });
      return () => {
        isCancelled = true;
      };
    };

    fetchCoinChart();
  }, [coin_id]);

  const data = {
    labels: chartData.map((date) => date[0]),
    datasets: [
      {
        label: "Price Graphic",
        data: chartData.map((price) => price[0]),
        backgroundColor: "red",
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fontSize: 5,
      },
    ],
  };

  return (
    <div className={style.chart}>
      <Line data={data} />
    </div>
  );
}

export default CoinChart;
