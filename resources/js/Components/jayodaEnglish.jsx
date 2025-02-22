import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/jayoda.css";

const JayodaEnglish = ({ name = "Jayoda" }) => {
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
    <div className="jayoda-ticket-container">
      <div className="jayoda-ticket-card">
        <div className="jayoda-ticket-header">
          <div className="jayoda-ticket-logo-container">
            <img
              src="/images/logo/jayoda.png"
              alt={name}
              className="jayoda-ticket-logo"
            />
          </div>
          <div className="jayoda-ticket-draw-number-container">
            
              <div className="jayoda-ticket-draw-number-text">
                Draw Number
              </div> 
              <div className="jayoda-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>

          
              <div className="jayoda-ticket-colour-text">
                Colour
              </div>
              <div className="jayoda-ticket-colour-text1">
                {lottery.color || "Loading..."}
              </div>
            
            <div className="jayoda-ticket-winning-numbers">
              <div className="jayoda-ticket-winning-numbers-title">
                ------ Winning Numbers ------
              </div>
              <div className="jayoda-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      
                        <div key={index} className="jayoda-ticket-winning-number">
                          <div className="jayoda-ticket-winning-number-text">
                            {ball}
                          </div>
                        </div>
                      
                    ))
                  : "Loading..."}
              </div>
            </div>
            <div className="jayoda-ticket-special">
            <div className="jayoda-ticket-bottom">
              Next Super Jackpot : {formatCurrency(lottery.next_super) || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="jayoda-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="jayoda-ticket-special-prize-icon"
                />
                <div className="special-numbers">
                  {lottery.special1 && (
                    <>
                      Special number for Rs. 50,000/-: {lottery.special1}
                      <br />
                    </>
                  )}
                    <div className="lagna-special-txt">
                      {lottery.special2 && <>Rs. 40/-: {lottery.special2}</>}
                    </div>
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

export default JayodaEnglish;
