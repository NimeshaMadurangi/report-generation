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

  return (
    <div className="adakotipathi-ticket-container">
      <div className="adakotipathi-ticket-card">
        <div className="adakotipathi-ticket-header">
          <div className="adakotipathi-ticket-logo-container">
            <img
              src="/images/AD.png"
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
                      
                        <div key={index} className="adakotipathi-ticket-winning-number-text">
                          {ball}
                        </div>
                      
                    ))
                  : "Loading..."}
              </div>
            </div>
            <div className="adakotipathi-ticket-special">
            <div className="adakotipathi-ticket-bottom">
              Next Super Jackpot : Rs. {lottery.next_super || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="adakotipathi-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="adakotipathi-ticket-special-prize-icon"
                />
                <div className="special-numbers">
                  {lottery.special1 && (
                    <>
                      Special number for Rs. 50,000/-: {lottery.special1}
                      <br />
                    </>
                  )}
                  {lottery.special2 && <>Rs. 40,000/-: {lottery.special2}</>}
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
