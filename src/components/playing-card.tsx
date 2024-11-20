import { useState, useEffect } from "react";
import ReactFlipCard from "reactjs-flip-card";
import { Card } from "@/models/Card";
import BackImage from "/back.png";

interface PlayingCardProps {
  card: Card | null;
  canFlip: boolean;
  isFaceUp: boolean;
  isDealer?: boolean;  // Nova prop para indicar se é uma carta do dealer
  onCardClick?: () => void;
}

export function PlayingCard({
  card,
  canFlip,
  isFaceUp,
  isDealer = false,  // Padrão como falso, então não será dealer por padrão
  onCardClick,
}: PlayingCardProps) {
  const [isFlipped, setIsFlipped] = useState(isFaceUp);

  useEffect(() => {
    if (card) {
      if (isFaceUp || (isDealer && isFaceUp)) {
        setIsFlipped(true);  // Dealer tem flip controlado
      } else {
        setIsFlipped(false);
      }
    }
  }, [card, isFaceUp, isDealer]);

  const handleCardClick = () => {
    if (card === null && onCardClick) {
      onCardClick();
    } else if (canFlip) {
      setIsFlipped((prev) => !prev);
    }
  };

  // Renderiza uma carta em branco se `card` for `null`
  if (card === null) {
    return (
      <div onClick={handleCardClick}>
        <ReactFlipCard
          frontComponent={<img src={BackImage} alt="back" className="max-h-48" />}
          frontCss="cursor-pointer hover:scale-105 duration-200"
          backComponent={null}
          flipTrigger="disabled"
        />
      </div>
    );
  }

  // Controla o flip da carta com `isFlipped`
  return (
    <ReactFlipCard
      frontComponent={<img src={BackImage} alt="back" className="max-h-48" />}
      backComponent={<img src={card.image} alt={card.code} className="max-h-48" />}
      flipTrigger="disabled"
      flipByProp={isFlipped}
      onClick={handleCardClick}
      frontCss="cursor-pointer hover:scale-105 duration-200"
      backCss="cursor-pointer hover:scale-105 duration-200"
    />
  );
}
