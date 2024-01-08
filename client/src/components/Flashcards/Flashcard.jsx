import "./index.scss";
import { useEffect, useRef, useState, useCallback } from "react";
import ReactCardFlip from "react-card-flip";

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [height, setHeight] = useState(100);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const frontElement = useRef();
  const backElement = useRef();

  const getHeight = useCallback(() => {
    const frontHeight = frontElement.current.getBoundingClientRect().height;
    const backHeight = backElement.current.getBoundingClientRect().height;
    return Math.max(frontHeight, backHeight, 100);
  }, [flashcard.spanishWord, flashcard.englishTranslation]);

  useEffect(() => {
    setHeight(getHeight());
  }, [getHeight]);

  const cardStyles = {
    front: {
      height: height,
      backgroundColor: "#cec6ff",
      borderRadius: "0.25rem",
      boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      transition: "transform 0.6s",
      cursor: "pointer",
    },
    back: {
      height: height,
      backgroundColor: "white",
      borderRadius: "0.25rem",
      boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      transition: "transform 0.6s",
      cursor: "pointer",
    },
  };

  return (
    <figure onClick={handleClick}>
      <ReactCardFlip
        isFlipped={isFlipped}
        cardStyles={cardStyles}
        flipDirection="horizontal"
      >
        <div className="front" ref={frontElement}>
          {flashcard.spanishWord}
        </div>
        <div className="back" ref={backElement}>
          {flashcard.englishTranslation}
        </div>
      </ReactCardFlip>
    </figure>
  );
};

export default Flashcard;
