import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/kapruka.css";

const KaprukaEnglish = ({ name = "Kapruka" }) => {
  const [lottery, setLottery] = useState({
    number: null,
    color: null,
    ball1: null,
    ball2: null,
    ball3: null,
    ball4: null,
    ball5: null,
    ball6: null,
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

  // Combine individual balls into an array
  const balls = [lottery.ball5, lottery.ball6, lottery.ball1,lottery.ball2,lottery.ball3,lottery.ball4].filter(
    (ball) => ball !== null
  );

  return (
    <div className="kapruka-ticket-container">
      <div className="kapruka-ticket-card">
        <div className="kapruka-ticket-header">
          <div className="kapruka-ticket-logo-container">
            <img
              src="/images/kapruka.png"
              alt={name}
              className="kapruka-ticket-logo"
            />
          </div>
          <div className="kapruka-ticket-draw-number-container">
            
              <div className="kapruka-ticket-draw-number-text">
                Draw Number 
              </div>
              <div className="kapruka-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>
            
            
              <div className="kapruka-ticket-colour-text">
                Colour
              </div>
              <div className="kapruka-ticket-colour-text1">
                {lottery.color || "Loading..."}
              </div>
            
            <div className="kapruka-ticket-winning-numbers">
              <div className="kapruka-ticket-winning-numbers-title">
                English Letter, Super Number & Winning Numbers
              </div>
              </div>
              <div className="kapruka-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      
                        <div key={index} className="kapruka-ticket-winning-number-text">
                          {ball}
                        </div>
                      
                    ))
                  : "Loading..."}
              </div>
            
              <div className="kapruka-ticket-special">
            <div className="kapruka-ticket-bottom">
              Next Super Jackpot : Rs. {lottery.next_super || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="kapruka-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="kapruka-ticket-special-prize-icon"
                />
                <div className="special-numbers">
                  {lottery.special1 && (
                    <>
                      Special number for Rs. 50,000/-: {lottery.special1}
                      <br />
                    </>
                  )}
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

export default KaprukaEnglish;
