import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/supiridana.css";

const SupiridanaSinhala = ({ name = "Supiri Dhana Sampatha" }) => {
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
                  දිනුම් වාරය
              </div>
              <div className="supiridana-ticket-draw-number-text1">
                {lottery.number || "Loading..."}
              </div>
            
           
              <div className="supiridana-ticket-colour-text">
                වර්ණය
              </div>
              <div className="supiridana-ticket-colour-text1">
                {translateColor(lottery.color) || "Loading..."}
              </div>
           
            <div className="supiridana-ticket-winning-numbers">
              <div className="supiridana-ticket-winning-numbers-title">
              ------- ඉංග්‍රීසි අකුර, සුපිරි අංකය සහ ජයග්‍රාහී අංක -------
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
            <div className="lagna-ticket-special">
              <div className="lagna-ticket-bottom">
                මීළඟ සුපිරි ජයමල්ල රු. {lottery.next_super || "Loading..."}
              </div>
              {/* Special Numbers Section */}
              {(lottery.special1 || lottery.special2) && (
                <div className="lagna-ticket-special-prize-container">
                  <img
                    src="/images/sc.png"
                    alt="Special Prize"
                    className="lagna-ticket-special-prize-icon"
                  />
                  <div className="special-numbers">
                    {lottery.special1 && (
                      <>
                        රු. 50,000/- සඳහා විශේෂ අංකය :{" "}
                        {lottery.special1 || "Loading..."}
                        <br />
                      </>
                    )}
                    {lottery.special2 && <>රු. 40/-: {lottery.special2}</>}
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

export default SupiridanaSinhala;
