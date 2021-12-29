import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useAPI } from "../../Contexts/APIContext";
import style from "./style.module.css";

function Main() {
  const { coinData } = useAPI();
  const { query, setQuery } = useAPI();

  return (
    <div className={style.main}>
      <div className='d-flex justify-content-center'>
        <div className='col-md-8'>
          <input
            type='text'
            placeholder='Search for coin...'
            className={style.searchForm}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className={style.coinTableDiv}>
        <Table responsive className={style.coinTable}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Coin</th>
              <th>Price</th>
              <th>Total Volume</th>
              <th>Mkt Cap</th>
            </tr>
          </thead>
          <tbody>
            {coinData &&
              coinData
                .filter((coin) => {
                  /* coin arama filtresi */
                  if (query === "") return coin;
                  else
                    return coin.name
                      .toLowerCase()
                      .includes(query.toLocaleLowerCase());
                })
                .map((coin, index) => (
                  <tr key={index}>
                    <td>{coin.market_cap_rank}</td>
                    <td>
                      <img
                        src={coin.image}
                        alt='icon'
                        className={style.iconImg}
                      />
                      <Link to={`/${coin.id}`}>{coin.name}</Link>
                    </td>
                    <td>{coin.current_price}</td>
                    <td>{coin.total_volume}</td>
                    <td>{coin.market_cap}</td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Main;
