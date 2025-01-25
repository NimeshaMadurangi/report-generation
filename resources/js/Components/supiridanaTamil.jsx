import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/supiridana.css";

const SupiridanaTamil = ({ name = "Supiri Dhana Sampatha" }) => {
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

 
  const translateColor = (color) => {
    if (color === "Green" || color === "green") {
        return "பச்சை";
    }
    else if (color === "Red" || color === "red") {
        return "சிகப்பு";
    }
    else if (color === "Blue" || color === "blue") {
        return "நீலம்";
    }
    else if (color === "Orange" || color === "orange") {
        return "செம்மஞ்சள்";
    }
    else if (color === "Pink" || color === "pink") {
        return "இளஞ்சிகப்பு";
    }
    else if (color === "Purple" || color === "purple") {
        return "ஊதா";
    }
    else if (color === "Yellow" || color === "yellow") {
      return "மஞ்சள்";
    }
    else if (color === "Brown" || color === "Brown") {
      return "பழுப்பு";
    }
    else if (color === "Light Blue" || color === "light blue" || color === "Light blue") {
        return "இளநீலம்";
    }
    else if (color === "Light Pink" || color === "light pink" || color === "Light pink") {
        return "இளஞ்சிகப்பு";
    }
    return color;
};


  const balls = [lottery.ball1, lottery.ball2, lottery.ball3, lottery.ball4, lottery.ball5, lottery.ball6, lottery.ball7].filter(
    (ball) => ball !== null
  );

  return (
    <div className="supiridana-ticket-container">
      <div className="supiridana-ticket-card">
        <div className="supiridana-ticket-header">
          <div className="supiridana-ticket-logo-container">
            <img
              src="/images/supiridana.png"
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
                      <div
                        key={index}
                        className="supiridana-ticket-winning-number"
                      >
                        <div className="supiridana-ticket-winning-number-text">
                          {ball}
                        </div>
                      </div>
                    ))
                  : "Loading..."}
              </div>
            </div>
            <div className="supiridana-ticket-special">
              <div className="supiridana-ticket-bottom">
                <div className="supiridana-ticket-next-jackpot">
                  Next Super Jackpot : Rs. {lottery.next_super || "Loading..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupiridanaTamil;
