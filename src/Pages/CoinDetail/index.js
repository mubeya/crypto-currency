import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Row, Col } from "react-bootstrap";
import style from "./style.module.css";
import CoinChart from "../../Components/CoinChart";
import { useAPI } from "../../Contexts/APIContext";

function CoinDetail() {
  const { coinDetail, setCoinDetail } = useAPI();
  const { coin_id } = useParams();

  useQuery(["coin_id", coin_id], () =>
    axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin_id}`
    ).then((res) => setCoinDetail(res.data[0]))
  );

  // https://api.coingecko.com/api/v3/search/trending

  return (
    <div>
      <Header />
      {coinDetail && (
        <div className={style.main}>
          <p>Rank #{coinDetail.market_cap_rank}</p>
          <div className={style.mainName}>
            <img src={coinDetail.image} alt='icon' className={style.iconImg} />
            <p>{coinDetail.name}</p>
          </div>
          <p className={style.currentPrice}>${coinDetail.current_price}</p>
          <div>
            <progress
              className={style.progressBar}
              min='0'
              max='1688.7284919794984'
              value='1646.197477914473'></progress>
            <div className={style.hourRange}>
              <p>${coinDetail.low_24h}</p>
              <p>24H Range</p>
              <p>${coinDetail.high_24h}</p>
            </div>
          </div>
          <Row>
            <Col>
              <div className={style.mainTag}>
                <span className={style.labelTag}>Market Cap : </span>
                <span className={style.dataTag}>${coinDetail.market_cap}</span>
              </div>
              <div className={style.mainTag}>
                <span className={style.labelTag}>24H Supply : </span>
                <span className={style.dataTag}>
                  ${coinDetail.circulating_supply}
                </span>
              </div>
              <div className={style.mainTag}>
                <span className={style.labelTag}>Circulating Supply : </span>
                <span className={style.dataTag}>
                  ${coinDetail.circulating_supply}
                </span>
              </div>
            </Col>
            <Col>
              <div className={style.mainTag}>
                <span className={style.labelTag}>Fully Diluted Val :</span>
                <span className={style.dataTag}>
                  {coinDetail.fully_diluted_valuation}
                </span>
              </div>
              <div className={style.mainTag}>
                <span className={style.labelTag}>Total Supply</span>
                <span className={style.dataTag}>{coinDetail.total_supply}</span>
              </div>
              <div className={style.mainTag}>
                <span className={style.labelTag}>Max Supply : </span>
                <span className={style.dataTag}>{coinDetail.max_supply}</span>
              </div>
            </Col>
          </Row>
        </div>
      )}
      <CoinChart />
      <Footer />
    </div>
  );
}

export default CoinDetail;
