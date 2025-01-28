import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/supiridana.css";

const SupiridanaEnglish = ({ name = "Supiri Dhana Sampatha" }) => {
  const [lottery, setLottery] = useState({
    number: null,
    color: null,
    ball1: null,
    ball2: null,
    ball3: null,
    ball4: null,
    ball5: null,
    ball6: null,
    ball7: null,
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

 
  const balls = [lottery.ball1, lottery.ball2, lottery.ball3, lottery.ball4, lottery.ball5, lottery.ball6, lottery.ball7].filter(
    (ball) => ball !== null
  );

  return (
    <div className="supiridana-ticket-container">
      <div className="supiridana-ticket-card">
        <div className="supiridana-ticket-header">
          <div className="supiridana-ticket-logo-container">
            <img
              src="/images/sde.png"
              alt={name}
              className="supiridana-ticket-logo"
            />
          </div>
          <div className="supiridana-ticket-draw-number-container">
           
              <div className="supiridana-ticket-draw-number-text">
                Draw Number
              </div>
              <div className="supiridana-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>
            
            
              <div className="supiridana-ticket-colour-text">
                Colour
              </div>
              <div className="supiridana-ticket-colour-text1">
                {lottery.color || "Loading..."}
              </div>
            
            <div className="supiridana-ticket-winning-numbers">
              <div className="supiridana-ticket-winning-numbers-title">
                English Letter, Super Number & Winning Numbers
              </div>
              <div className="supiridana-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      
                        <div key={index} className="supiridana-ticket-winning-number-text">
                          {ball}
                        </div>
                      
                    ))
                  : "Loading..."}
              </div>
            </div>
            <div className="supiridana-ticket-special">
            <div className="supiridana-ticket-bottom">
              Next Super Jackpot : Rs. {lottery.next_super || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="supiridana-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="supiridana-ticket-special-prize-icon"
                />
                <div className="special-numbers">
                  {lottery.special1 && (
                    <>
                      Special number for <br /> Rs. 50,000/- : {lottery.special1}
                    </>
                  )}
                  <> | </>
                  {lottery.special2 && <>Rs. 40/-: {lottery.special2}</>}
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

export default SupiridanaEnglish;
