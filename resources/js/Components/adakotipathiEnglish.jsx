import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/adakotipathi.css";

const AdakotipathiEnglish = ({ name = "Ada kotipathi" }) => {
  const [lottery, setLottery] = useState({
    number: null,
    color: null,
    ball1: null,
    ball2: null,
    ball3: null,
    ball4: null,
    ball5: null,
    next_super: null,
    special4: null,
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
    return "Rs. " + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
  };

  return (
    <div className="adakotipathi-ticket-container">
      <div className="adakotipathi-ticket-card">
        <div className="adakotipathi-ticket-header">
          <div className="adakotipathi-ticket-logo-container">
            <img
              src="/images/logo/adakotipathi.png"
              alt={name}
              className="adakotipathi-ticket-logo"
            />
          </div>
          <div className="adakotipathi-ticket-draw-number-container">
            
              <div className="adakotipathi-ticket-draw-number-text">
                Draw Number
              </div>
              <div className="adakotipathi-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>
            
            
              <div className="adakotipathi-ticket-colour-text">
                Colour
              </div>
              <div className="adakotipathi-ticket-colour-text1">
                {lottery.color || "Loading..."}
              </div>
            
            <div className="adakotipathi-ticket-winning-numbers">
              <div className="adakotipathi-ticket-winning-numbers-title">
                ---- Winning Numbers ----
              </div>
              <div className="adakotipathi-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      
                        <div key={index} className="adakotipathi-ticket-winning-number">
                          <div className="adakotipathi-ticket-winning-number-text">
                            {ball}
                          </div>
                        </div>
                      
                    ))
                  : "Loading..."}
              </div>
            </div>
            <div className="adakotipathi-ticket-special">
            <div className="adakotipathi-ticket-bottom">
              Next Super Jackpot : {formatCurrency(lottery.next_super) || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special4) && (
              <div className="adakotipathi-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="adakotipathi-ticket-special-prize-icon"
                />

                  <div className="superball-special-numbers">
                      {lottery.special4 && (
                      <>
                        <div className="superball-special-numbers-text"> 
                          Special number <br /> for Rs. 100,000/-
                        </div>
                        <div className="lagna-special-txt">
                          {lottery.special4}
                        </div>
                      </>
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

export default AdakotipathiEnglish;
