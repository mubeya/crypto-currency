import "./App.css";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "././Contexts/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "././Pages/Home";
import FAQ from "././Pages/FAQ";
import CoinDetail from "././Pages/CoinDetail";
import Error from "././Pages/Error";

function App() {
  const { keepTheme } = useTheme();

  useEffect(() => {
    keepTheme();
  });

  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* react router yeni versiyonda element kullanarak componentlerı çağırıyoruz */}
          <Route path='/' exact element={<Home />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/:coin_id' element={<CoinDetail />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
