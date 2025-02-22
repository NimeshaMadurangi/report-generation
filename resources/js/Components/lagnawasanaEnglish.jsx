import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/lagna.css";

const LagnaWasanaEnglish = ({ name = "Lagna Wasanawa" }) => {

  const [lottery, setLottery] = useState({
    number: null,
    color: null,
    ball1: null,
    ball2: null,
    ball3: null,
    ball4: null,
    ball5: null,
    next_super: null,
    special1: null,
    special2: null,
    special3: null,
  });

  
  useEffect(() => {
    const fetchLottery = async () => {
      try {
        const response = await axios.get(`/api/lottery`, { params: { name } });
        setLottery(response.data);
      } catch (error) {
        console.error("Error fetching lottery data:", error);
      }
    };

    fetchLottery();
  }, [name]);


  const balls = [lottery.ball1, lottery.ball2, lottery.ball3, lottery.ball4, lottery.ball5].filter(
    (ball) => ball !== null
  );

  const ballImageMap = {
    CAPRICORN: "/images/lagnaimages/capricorn.png",
    AQUARIUS: "/images/lagnaimages/aquarius.png",
    PISCES: "/images/lagnaimages/pisces.png",
    ARIES: "/images/lagnaimages/aries.png",
    TAURUS: "/images/lagnaimages/taurus.png",
    GEMINI: "/images/lagnaimages/gemini.png",
    CANCER: "/images/lagnaimages/cancer.png",
    LEO: "/images/lagnaimages/leo.png",
    VIRGO: "/images/lagnaimages/virgo.png",
    LIBRA: "/images/lagnaimages/libra.png",
    SCORPIO: "/images/lagnaimages/scorpio.png",
    SAGITTARIUS: "/images/lagnaimages/sagittarius.png",
  };

  const formatCurrency = (amount) => {
    return "Rs. " + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

  return (
    <div className="lagna-ticket-container">
      <div className="lagna-ticket-card">
        <div className="lagna-ticket-header">
          <div className="lagna-ticket-logo-container">
            <img
              src="/images/logo/lagnaenglish.png"
              alt={name}
              className="lagna-ticket-logo"
            />
          </div>
          <div className="lagna-ticket-draw-number-container">
           
              <div className="lagna-ticket-draw-number-text">
                Draw Number
                </div>
                <div className="lagna-ticket-draw-number-text1">
                  {lottery.number || "Loading..."}
                </div>
           
                <div className="lagna-ticket-colour-text">
                  Colour 
                </div>
                <div className="lagna-ticket-colour-text1">
                  {lottery.color || "Loading..."}
                </div>
            
           
            <div className="lagna-ticket-winning-numbers">
              <div className="lagna-ticket-winning-numbers-title">
                ---- Winning Numbers ----
              </div>
              <div className="lagna-ticket-winning-numbers-container">
              {balls.length > 0
                ? balls.map((ball, index) => (
                    <div key={index} className="lagna-ticket-winning-number">
                      {index === 4 && ballImageMap[ball] ? (
                        <>
                          <img
                            src={ballImageMap[ball]}
                            alt={`Ball ${ball}`}
                            className="lagna-ticket-ball-image"
                          />
                          <div className="lagna-ticket-ball-name">{ball}</div>
                        </>
                      ) : (
                        <div className="lagna-ticket-winning-number-text">
                          {ball}
                        </div>
                      )}
                    </div>
                  ))
                : "Loading..."}
            </div>
            </div>
            <div className="lagna-ticket-special">
            <div className="lagna-ticket-bottom">
              Next Super Jackpot : {formatCurrency(lottery.next_super) || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="lagna-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="lagna-ticket-special-prize-icon"
                />
                
                <div className="lagna-special-numbers">
                  {lottery.special1 && (
                    <>
                      <div className="lagna-special-numbers-text-pp"> 
                        Special number <br /> for Rs. 50,000/-
                      </div>
                      <div className="lagna-special-txt"> {lottery.special1} </div>
                    </>
                  )}
                  </div>
                  
                  <div className="lagna-special-numbers">
                      <div className="lagna-special-numbers-text-pp"> 
                          Special number <br /> for Rs. 40/-
                      </div>
                      <div className="lagna-special-txt"> {lottery.special2 && <>{lottery.special2}</>} </div>
                </div>

                <div className="superball-special-numbers">
                    {lottery.special3 && (
                      <div className="superball-special-numbers-text">
                        Special number <br /> for Rs. 200/- <br />
                        <div className="lagna-special-txt"> {lottery.special3 && <>{lottery.special3}</>} </div>
                      </div>
                    )}
                  </div>

              </div>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LagnaWasanaEnglish;
