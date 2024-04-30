import React, { useState, useEffect } from "react";
import { message } from "antd";
import "./App.css";

function App() {
  const [guess, setGuess] = useState("");
  const [secretNumber, setSecretNumber] = useState(
    () => Math.trunc(Math.random() * 20) + 1
  );
  // console.log(secretNumber);
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem("highScore")) || 0
  );
  const [messageText, setMessage] = useState("Start guessing...");
  const [backgroundColor, setBackgroundColor] = useState("#222");

  useEffect(() => {
    localStorage.setItem("highScore", highScore);
  }, [highScore]);

  const handleCheck = () => {
    const numGuess = Number(guess);
    if (!numGuess || numGuess < 1 || numGuess > 20) {
      message.error("Please enter a number between 1 and 20!");
      return;
    }

    if (numGuess === secretNumber) {
      setMessage("🎉 Correct Number!");
      setBackgroundColor("#60b347");
      if (score > highScore) {
        setHighScore(score);
      }
    } else {
      setBackgroundColor("#222");
      if (score > 1) {
        setMessage(numGuess > secretNumber ? "📈 Too high!" : "📉 Too low!");
        setScore((prevScore) => prevScore - 1);
      } else {
        setMessage("💥 You lost the game!");
        setScore(0);
      }
    }
  };

  const handleAgain = () => {
    setSecretNumber(Math.trunc(Math.random() * 20) + 1);
    setScore(20);
    setMessage("Start guessing...");
    setGuess("");
    setBackgroundColor("#222");
  };

  return (
    <div className="game" style={{ backgroundColor: backgroundColor }}>
      <header>
        <h1>Guess My Number!</h1>
        <p className="between">(Between 1 and 20)</p>
        <button className="btn again" onClick={handleAgain}>
          Again!
        </button>
        <div className="number">?</div>
      </header>
      <main>
        <section className="left">
          <input
            type="number"
            className="guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button className="btn check" onClick={handleCheck}>
            Check!
          </button>
        </section>
        <section className="right">
          <p className="message">{messageText}</p>
          <p className="label-score">
            💯 Score: <span className="score">{score}</span>
          </p>
          <p className="label-highscore">
            🥇 Highscore: <span className="highscore">{highScore}</span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
