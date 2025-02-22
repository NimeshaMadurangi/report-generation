import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/adakotipathi.css";

const AdakotipathiTamil = ({ name = "Ada kotipathi" }) => {
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

const formatCurrency = (amount) => {
  return "ரூ. " + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
          <div className="adakotipathi-ticket-draw-number-container-tm">
            
              <div className="adakotipathi-ticket-draw-number-text">
                வெற்றி வாரம்
              </div>
              <div className="adakotipathi-ticket-draw-number-text1-tm">
                {lottery.number || "Loading..."}
              </div>
           
            
              <div className="adakotipathi-ticket-colour-text">
                வர்ணம்
              </div>
              <div className="adakotipathi-ticket-colour-text1">
                {translateColor(lottery.color) || "Loading..."}
              </div>
            
            <div className="adakotipathi-ticket-winning-numbers">
              <div className="adakotipathi-ticket-winning-numbers-title-tm">
                ----- வெற்றி எண்கள் -----
              </div>
              <div className="adakotipathi-ticket-winning-numbers-container-tm">
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
            <div className="adakotipathi-ticket-bottomtm">
              அடுத்த சுப்பர் ஐக்பொட் : <div className="adakotipathi-ticket-bottomtm-txt">
                {formatCurrency(lottery.next_super) || "Loading..."}
              </div>
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
                          வீசேட இலக்கங்கள் <br /> ரூ. 100,000/- 
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

export default AdakotipathiTamil;
