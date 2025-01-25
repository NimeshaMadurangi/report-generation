import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/kapruka.css";

const KaprukaSinhala = ({ name = "Kapruka" }) => {
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

  const translateColor = (color) => {
    if (color === "Green" || color === "green") {
      return "කොළ";
    }
    else if (color === "Red" || color === "red") {
        return "රතු";
    }
    else if (color === "Blue" || color === "blue") {
      return "නිල්";
    }
    else if (color === "Orange" || color === "orange") {
      return "තැඹිලි";
    }
    else if (color === "Pink" || color === "pink") {
      return "රෝස";
    }
    else if (color === "Purple" || color === "purple") {
      return "දම්";
    }
    else if (color === "Yellow" || color === "yellow") {
      return "කහ";
    }
    else if (color === "Light Blue" || color === "light blue" || color === "Light blue") {
      return "ලා නිල්";
    }
    else if (color === "Light Pink" || color === "light pink" || color === "Light pink") {
      return "ලා රෝස";
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
                දිනුම් වාරය
              </div>
              <div className="kapruka-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>
            
            
              <div className="kapruka-ticket-colour-text">
                වර්ණය
              </div>
              <div className="kapruka-ticket-colour-text1">
                {translateColor(lottery.color) || "Loading..."}
              </div>
         
            <div className="kapruka-ticket-winning-numbers">
              <div className="kapruka-ticket-winning-numbers-title">
                ------- ඉංග්‍රීසි අකුර, සුපිරි අංකය සහ ජයග්‍රාහී අංක -------
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
                  මීළඟ සුපිරි ජයමල්ල රු. {lottery.next_super || "Loading..."}
                </div>
                {lottery.special1 && (
                  <div className="kapruka-ticket-special-prize-container">
                    <img
                      src="/images/sc.png"
                      alt="Special Prize"
                      className="kapruka-ticket-special-prize-icon"
                    />
                    <div className="special-numbers">
                      රු. 50,000/- සඳහා <br /> විශේෂ අංකය : {lottery.special1 || "Loading..."}
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

export default KaprukaSinhala;
