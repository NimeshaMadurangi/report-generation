import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/shanida.css";

const ShanidaEnglish = ({ name = "Shanida" }) => {
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

  const formatCurrency = (amount) => {
    return "Rs. " + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="shanida-ticket-container">
      <div className="shanida-ticket-card">
        <div className="shanida-ticket-header">
          <div className="shanida-ticket-logo-container">
            <img
              src="/images/logo/shanida.png"
              alt={name}
              className="shanida-ticket-logo"
            />
          </div>
          <div className="shanida-ticket-draw-number-container">
            
              <div className="shanida-ticket-draw-number-text">
                Draw Number
              </div>
              <div className="shanida-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>
            
            
              <div className="shanida-ticket-colour-text">
                Colour
              </div>
              <div className="shanida-ticket-colour-text1">
                {lottery.color || "Loading..."}
              </div>
            
            <div className="shanida-ticket-winning-numbers">
              <div className="shanida-ticket-winning-numbers-title">
                ---- Winning Numbers ----
              </div>
              <div className="shanida-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                     
                        <div key={index} className="shanida-ticket-winning-number">
                          <div className="shanida-ticket-winning-number-text">
                            {ball}
                          </div>
                        </div>
                      
                    ))
                  : "Loading..."}
              </div>
            </div>
            <div className="shanida-ticket-special">
            <div className="shanida-ticket-bottom">
              Next Super Jackpot : {formatCurrency(lottery.next_super) || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="shanida-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="shanida-ticket-special-prize-icon"
                />
                <div className="superball-special-numbers">
                      {lottery.special1 && (
                      <>
                        <div className="superball-special-numbers-text"> 
                          Special number <br /> for Rs. 50,000/-
                        </div>
                        <div className="lagna-special-txt">
                          {lottery.special1}
                        </div>
                      </>
                    )}
                    </div>
                  
                    <div className="superball-special-numbers">
                    {lottery.special2 && (
                      <div className="superball-special-numbers-text">
                        Special number <br /> for Rs. 40/- <br />
                        <div className="lagna-special-txt"> {lottery.special2} </div>
                      </div>
                    )}
                  </div>

                  <div className="superball-special-numbers">
                    {lottery.special3 && (
                      <div className="superball-special-numbers-text">
                        Special number <br /> for Rs. 40/- <br />
                        <div className="lagna-special-txt"> {lottery.special3} </div>
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

export default ShanidaEnglish;
