import { useState, useEffect } from "react";
import axios from "axios";
import { useAPI } from "../../Contexts/APIContext";

function CoinChart() {
  const { coinDetail } = useAPI();
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchCoinChart = () => {
      coinDetail === undefined
        ? console.log("null")
        : axios
            .get(
              `https://api.coingecko.com/api/v3/coins/${coinDetail.id}/market_chart/range?vs_currency=usd&from=1640563200&to=1640612120`
            )
            .then((res) => setChartData(res.data));

      // setChartData({
      //   labels: chartData.prices.map((crypto) => crypto.name),
      //   datasets: [
      //     {
      //       label: "Price in USD",
      //       data: chartData.data.map((crypto) => crypto.priceUsd),
      //       backgroundColor: [
      //         "#ffbb11",
      //         "#ecf0f1",
      //         "#50AF95",
      //         "#f3ba2f",
      //         "#2a71d0",
      //       ],
      //     },
      //   ],
      // });
    };
    console.log(chartData);
    fetchCoinChart();
  }, [coinDetail]);

  return (
    <div>
      {chartData &&
        chartData.prices.map((data, index) => (
          <p key={index}>
            {data[0]} - {data[1]}
          </p>
        ))}
    </div>
  );
}

export default CoinChart;
