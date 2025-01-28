import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/lagna.css";

const LagnaWasanaTamil = ({ name = "Lagna Wasanawa" }) => {
  // State for lottery data
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

  // Fetch lottery data on component mount
  useEffect(() => {
    const fetchLottery = async () => {
      try {
        const response = await axios.get(`/api/lottery`, { params: { name } });
        setLottery(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching lottery data:", error);
      }
    };

    fetchLottery();
  }, [name]);

  // Combine individual balls into an array
  const balls = [
    lottery.ball1,
    lottery.ball2,
    lottery.ball3,
    lottery.ball4,
    lottery.ball5,
  ].filter((ball) => ball !== null);

  // Function to translate color to Tamil
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


  // Function to translate ball names to Tamil
  const translateBallName = (ball) => {
    const translations = {
      CAPRICORN: "மகரம்",
      AQUARIUS: "கும்பம்",
      PISCES: "மீனம்",
      ARIES: "மேஷம்",
      TAURUS: "ரிஷபம்",
      GEMINI: "மிதுனம்",
      CANCER: "கடகம்",
      LEO: "சிம்மம்",
      VIRGO: "கன்னி",
      LIBRA: "துலாம்",
      SCORPIO: "விருச்சிகம்",
      SAGITTARIUS: "தனுசு",
    };
    return translations[ball] || ball;
  };

  const ballImageMap = {
    CAPRICORN: "/images/lagnaimages/capricorn.png",
    AQUARIUS: "/images/lagnaimages/aquarius.png",
    PISCES: "/images/lagnaimages/pisces.png",
    ARIES: "/images/lagnaimages/aries.png",
    TAURUS: "/images/lagnaimages/taurus.png",
    GEMINI: "/images/lagnaimages/gemini.png",
    CANCER: "/images/lagnaimages/cancer.png",
    LEO: "/images/lagnaimages/leo.png",
    VIRGO: "/images/lagnaimages/virgo.png",
    LIBRA: "/images/lagnaimages/libra.png",
    SCORPIO: "/images/lagnaimages/scorpio.png",
    SAGITTARIUS: "/images/lagnaimages/sagittarius.png",
  };

  return (
    <div className="lagna-ticket-container">
      <div className="lagna-ticket-card">
        <div className="lagna-ticket-header">
          <div className="lagna-ticket-logo-container">
            <img
              src="/images/lgt.png"
              alt={name}
              className="lagna-ticket-logo"
            />
          </div>
          <div className="lagna-ticket-draw-number-container">
            <div className="lagna-ticket-draw-number-text">வெற்றி வாரம்</div>
            <div className="lagna-ticket-draw-number-text1-tm">
              {lottery.number || "Loading..."}
            </div>

            <div className="lagna-ticket-colour-text">நிறம்</div>
            <div className="lagna-ticket-colour-text1">
              {translateColor(lottery.color) || "Loading..."}
            </div>

            <div className="lagna-ticket-winning-numbers">
              <div className="lagna-ticket-winning-numbers-title">
                --- வெற்றி எண்கள் ---
              </div>
              <div className="lagna-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      <div key={index} className="lagna-ticket-winning-number">
                        {index === 4 && ballImageMap[ball] ? (
                          <>
                            <img
                              src={ballImageMap[ball]}
                              alt={`Ball ${ball}`}
                              className="lagna-ticket-ball-image"
                            />
                            <div className="lagna-ticket-ball-name">
                              {translateBallName(ball)}
                            </div>
                          </>
                        ) : (
                          <div className="lagna-ticket-winning-number-text">
                            {translateBallName(ball)}
                          </div>
                        )}
                      </div>
                    ))
                  : "Loading..."}
              </div>
            </div>

            <div className="lagna-ticket-special">
              <div className="lagna-ticket-bottomtm">
                அடுத்த சுப்பர் ஐக்பொட் : ரூ.{lottery.next_super || "Loading..."}
              </div>
              {(lottery.special1 || lottery.special2) && (
                <div className="lagna-ticket-special-prize-container">
                  <img
                    src="/images/sc.png"
                    alt="Special Prize"
                    className="lagna-ticket-special-prize-icon"
                  />
                  <div className="special-numbers-tamil">
                    {lottery.special1 && (
                      <>
                       வீசேட இலக்கங்கள் <br /> 
                       ரூ 50,000/- : {lottery.special1 || "Loading..."}
                      </>
                    )}
                    
                    <> | </>
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

export default LagnaWasanaTamil;
