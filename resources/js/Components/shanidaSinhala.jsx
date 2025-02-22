import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/shanida.css";

const ShanidaSinhala = ({ name = "Shanida" }) => {
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

  const formatCurrency = (amount) => {
    return "රු. " + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="shanida-ticket-containersn">
      <div className="shanida-ticket-card">
        <div className="shanida-ticket-header">
          <div className="shanida-ticket-logo-container">
            <img
              src="/images/logo/shanida.png"
              alt={name}
              className="shanida-ticket-logosn"
            />
          </div>
          <div className="shanida-ticket-draw-number-containersn">
            
              <div className="shanida-ticket-draw-number-text">
                දිනුම් වාරය
              </div>
              <div className="shanida-ticket-draw-number-text1-sn">
                {lottery.number || "Loading..."}
              </div>
            
            
              <div className="shanida-ticket-colour-text">
                වර්ණය
              </div>
              <div className="shanida-ticket-colour-text1">
                {translateColor(lottery.color) || "Loading..."}
              </div>
            
            <div className="shanida-ticket-winning-numbers">
              <div className="shanida-ticket-winning-numbers-title">
                ------- ජයග්‍රාහී අංක -------
              </div>
              <div className="shanida-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      
                        <div key={index} className="shanida-ticket-winning-number">
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
              මීළඟ සුපිරි ජයමල්ල : {formatCurrency(lottery.next_super) || "Loading..."}
            </div>
            {/* Special Numbers Section */}
            {(lottery.special1 || lottery.special2) && (
              <div className="shanida-ticket-special-prize-container">
                <img
                  src="/images/sc.png"
                  alt="Special Prize"
                  className="shanida-ticket-special-prize-icon"
                />
                <div className="lagna-special-numbers">
                  {lottery.special1 && (
                    <>
                      <div className="lagna-special-numbers-text-pp"> 
                      විශේෂ අංකය <br /> රු. 50,000/- සඳහා
                      </div>
                      <div className="lagna-special-txt"> {lottery.special1} </div>
                    </>
                  )}
                  </div>
                  
                  {/* <div className="lagna-special-numbers">
                      <div className="lagna-special-numbers-text-pp"> 
                      විශේෂ අංකය <br /> රු. 40/- සඳහා
                      </div>
                      <div className="lagna-special-txt"> {lottery.special2 && <>{lottery.special2}</>} </div>
                </div> */}
              </div> 
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShanidaSinhala;
