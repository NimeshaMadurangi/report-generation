import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/superball.css";

const SuperballSinhala = ({ name = "Superball" }) => {
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
    special3: null,
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
    <div className="superball-ticket-containersn">
      <div className="superball-ticket-card">
        <div className="superball-ticket-header">
          <div className="superball-ticket-logo-container">
            <img
              src="/images/logo/superball.png"
              alt={name}
              className="superball-ticket-logosn"
            />
          </div>
          <div className="superball-ticket-draw-number-containersn">
            
              <div className="superball-ticket-draw-number-text">
                දිනුම් වාරය
              </div>
              <div className="superball-ticket-draw-number-text1-sn">
                {lottery.number || "Loading..."}
              </div>
           
            
              <div className="superball-ticket-colour-text">
                වර්ණය
              </div>
              <div className="superball-ticket-colour-text1">
                {translateColor(lottery.color) || "Loading..."}
              </div>
            
            <div className="superball-ticket-winning-numbers">
              <div className="superball-ticket-winning-numbers-title">
                ------- ජයග්‍රාහී අංක -------
              </div>
              <div className="superball-ticket-winning-numbers-container">
                {balls.length > 0
                  ? balls.map((ball, index) => (
                      
                        <div key={index} className="superball-ticket-winning-number">
                          <div className="superball-ticket-winning-number-text">
                            {ball}
                          </div>
                        </div>
                   
                    ))
                  : "Loading..."}
              </div>
            </div>
            <div className="superball-ticket-special">
              <div className="superball-ticket-bottom-sn">
                මීළඟ සුපිරි ජයමල්ල
                 {formatCurrency(lottery.next_super) || "Loading..."}
              </div>
              {/* Special Numbers Section */}
              {(lottery.special1 || lottery.special2) && (
                <div className="superball-ticket-special-prize-container">
                  <img
                    src="/images/sc.png"
                    alt="Special Prize"
                    className="superball-ticket-special-prize-icon"
                  />
                  <div className="lagna-special-numbers">
                  {lottery.special1 && (
                    <>
                      <div className="lagna-special-numbers-text-pp"> 
                      විශේෂ අංකය රු. 50,000/-
                      </div>
                      <div className="lagna-special-txt"> {lottery.special1} </div>
                    </>
                  )}
                  </div>
                  
                  {/* <div className="lagna-special-numbers">
                      <div className="lagna-special-numbers-text-pp"> 
                      විශේෂ අංකය <br /> රු. 40/-
                      </div>
                      <div className="lagna-special-txt"> {lottery.special2 && <>{lottery.special2}</>} </div>
                </div>

                <div className="lagna-special-numbers">
                      <div className="lagna-special-numbers-text-pp"> 
                      විශේෂ අංකය <br /> රු. 200/-
                      </div>
                      <div className="lagna-special-txt"> {lottery.special3 && <>{lottery.special3}</>} </div>
                </div>  */}

              </div> 
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperballSinhala;
