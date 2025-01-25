import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/kapruka.css";

const KaprukaTamil = ({ name = "Kapruka" }) => {
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


  return (
    <div className="kapruka-ticket-container">
      <div className="kapruka-ticket-card">
        <div className="kapruka-ticket-header">
          <div className="kapruka-ticket-logo-container">
            <img
              src="/images/logo/kapruka.png"
              alt={name}
              className="kapruka-ticket-logo"
            />
          </div>
          <div className="kapruka-ticket-draw-number-container">
            
              <div className="kapruka-ticket-draw-number-text">
                வெற்றி வாரம்
              </div>
              <div className="kapruka-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>
            
            
              <div className="kapruka-ticket-colour-text">
                வர்ணம்
              </div>
              <div className="kapruka-ticket-colour-text1">
                {translateColor(lottery.color) || "Loading..."}
              </div>
           
            <div className="kapruka-ticket-winning-numbers">
              <div className="kapruka-ticket-winning-numbers-title">
                ஆங்கில எமுத்து, சுப்பர் இலக்கம் ம்ற்றும் வெற்றி இலக்கம்
              </div>
              </div>
              <div className="kapruka-ticket-winning-numbers-container">
              <div className="kapruka-ticket-ball6">
                  <div className="kapruka-ticket-ball6-number">
                    <div className="kapruka-ticket-winning-number6-text">
                      {lottery.ball5 || "Loading..."}
                    </div>
                  </div>
                  <div className="kapruka-ticket-ball6-number">
                    <div className="kapruka-ticket-winning-number6-text">
                      {lottery.ball6 || "Loading..."}
                    </div>
                  </div>
              </div>
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      <div
                        key={index}
                        className="kapruka-ticket-winning-number"
                      >
                        <div className="kapruka-ticket-winning-number-text">
                          {ball}
                        </div>
                      </div>
                    ))
                  : "Loading..."}
              </div>
              <div className="kapruka-ticket-special">
                <div className="kapruka-ticket-bottomsn">
                  அடுத்த சுப்பர் ஐக்பொட் : ரூ. {lottery.next_super || "Loading..."}
                </div>
                {lottery.special1 && (
                  <div className="kapruka-ticket-special-prize-container">
                    <img
                      src="/images/sc.png"
                      alt="Special Prize"
                      className="kapruka-ticket-special-prize-icon"
                    />
                    <div className="special-numbers">
                      ரூ 50,000/- பணம் பரிசுகான <br/> வீசேட இலக்கங்கள் : {lottery.special1 || "Loading..."}
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

export default KaprukaTamil;
