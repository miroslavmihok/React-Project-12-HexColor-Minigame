import React, { useState, useEffect } from "react";

const ColorCodes = () => {
  const [correctColor, setCorrectColor] = useState("#FFFFFF");
  const [coloredBoxes, setColoredBoxes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [isGameActive, setIsGameActive] = useState(true);

  useEffect(() => {
    generateRandomColor();
  }, []);

  const generateRandomColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setCorrectColor(randomColor);
    const randomColor2 = "#" + Math.floor(Math.random() * 16777215).toString(16);
    const randomColor3 = "#" + Math.floor(Math.random() * 16777215).toString(16);

    const shuffledColors = shuffleArray([randomColor, randomColor2, randomColor3]);
    setColoredBoxes(shuffledColors);
    setSelectedColor("");
    setIsGameActive(true);
  };

  const handleColorSelection = (color) => {
    if (!isGameActive) return;
    setSelectedColor(color);
    setIsGameActive(false);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Color Codes</h1>
      <h2>{correctColor}</h2>
      <h2>What color is this?</h2>
      <div data-testid="color-container" style={{display: 'flex'}}>
        {coloredBoxes.map((color, idx) => (
          <div
            data-testid={color === correctColor ? "correct-color" : "incorrect-color"}
            key={idx}
            style={{ width: "100px", height: "100px", backgroundColor: color, cursor: "pointer"}}
            onClick={() => handleColorSelection(color)}
          ></div>
        ))}
      </div>
      {!isGameActive && (
        <div>
          {correctColor === selectedColor ? (
            <p>Correct!</p>
          ) : (
            <p>Incorrect!</p>
          )}
          <button onClick={generateRandomColor}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default ColorCodes;