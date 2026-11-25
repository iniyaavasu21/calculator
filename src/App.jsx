
import React, { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState("");
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const handleNumber = (num) => {
    if (waiting) {
      setDisplay(num);
      setWaiting(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperator = (op) => {
    if (operator && !waiting) {
      calculate();
    }
    setPrevious(display);
    setOperator(op);
    setWaiting(true);
  };

  const calculate = () => {
    if (!operator || previous === "") return;

    const a = parseFloat(previous);
    const b = parseFloat(display);
    let result;

    switch (operator) {
      case "+":
        result = a + b;
        break;
      case "−":
        result = a - b;
        break;
      case "×":
        result = a * b;
        break;
      case "÷":
        result = b === 0 ? "Error" : a / b;
        break;
      default:
        return;
    }

    setDisplay(
      result === "Error"
        ? "Error"
        : String(Number(result.toPrecision(12)))
    );
    setPrevious("");
    setOperator(null);
    setWaiting(true);
  };

  const handleClick = (value) => {
    if (value === "AC") {
      setDisplay("0");
      setPrevious("");
      setOperator(null);
      setWaiting(false);
    } else if (value === "DEL") {
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    } else if (value === "%") {
      setDisplay(String(parseFloat(display) / 100));
    } else if (value === ".") {
      if (waiting) {
        setDisplay("0.");
        setWaiting(false);
      } else if (!display.includes(".")) {
        setDisplay(display + ".");
      }
    } else if (["+", "−", "×", "÷"].includes(value)) {
      handleOperator(value);
    } else if (value === "=") {
      calculate();
    } else if (/^\d$/.test(value)) {
      handleNumber(value);
    }
  };

  const buttons = [
    ["AC", "DEL", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];

  return (
    <div className="app">
      <div className="calculator">
        <div className="heading">
          <span className="logo">✦</span>
          <h2>CALCULATOR</h2>
          <p>Smart. Simple. Powerful.</p>
        </div>

        <div className="display">
          <div className="previous">
            {previous} {operator || ""}
          </div>
          <div className="current">{display}</div>
        </div>

        <div className="buttons">
          {buttons.flat().map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`
                ${["÷", "×", "−", "+"].includes(btn) ? "operator" : ""}
                ${btn === "=" ? "equal" : ""}
                ${["AC", "DEL", "%"].includes(btn) ? "special" : ""}
                ${btn === "0" ? "zero" : ""}
              `}
            >
              {btn}
            </button>
          ))}
        </div>

        <footer>Designed for everyday calculations</footer>
      </div>
    </div>
  );
}

export default App;
