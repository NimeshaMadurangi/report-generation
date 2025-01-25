import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/shanida.css";

const ShanidaTamil = ({ name = "Shanida" }) => {
  const [lottery, setLottery] = useState({
    number: null,
    color: null,
    ball1: null,
    ball2: null,
    ball3: null,
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


  // Combine individual balls into an array
  const balls = [lottery.ball1, lottery.ball2, lottery.ball3, lottery.ball4, lottery.ball5].filter(
    (ball) => ball !== null
  );

  return (
    <div className="shanida-ticket-container">
      <div className="shanida-ticket-card">
        <div className="shanida-ticket-header">
          <div className="shanida-ticket-logo-container">
            <img
              src="/images/shanida.png"
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
                English Letter, Super Number & Winning Numbers
              </div>
              <div className="shanida-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      <div
                        key={index}
                        className="shanida-ticket-winning-number"
                      >
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
              அடுத்த சுப்பர் ஐக்பொட் : ரூ. {lottery.next_super || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="shanida-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="shanida-ticket-special-prize-icon"
                />
                <div className="special-numbers">
                  ரூ 50,000/-: {lottery.special1 && (
                    <>
                         {lottery.special1}
                      <br />
                    </>
                  )}
                  {lottery.special2 && <>ரூ 40/-: {lottery.special2}</>}
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

export default ShanidaTamil;
